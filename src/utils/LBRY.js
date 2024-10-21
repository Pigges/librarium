// Make an request to lbrynet
// To use a custom endpoint - set the LBRYNET variable in the .env file

import config from '../config';

const CHECK_DAEMON_STARTED_TRY_NUMBER = 200;

const methods = [
    "status", "stop", "version",
    "resolve", "get", "claim_search", "claim_list", "channel_create", "channel_update", "channel_import", "channel_list", "stream_abandon", "stream_list", "channel_abandon", "channel_sign", "support_create", "support_list", "stream_repost", "collection_resolve", "collection_list", "collection_create", "collection_update",
    "file_list", "file_delete", "file_set_status", "blob_delete", "blob_list", 
    "wallet_balance", "wallet_decrypt", "wallet_unlock", "wallet_list", "wallet_send", "wallet_status", "address_is_mine", "address_unused", "address_list", "transaction_list", "utxo_release", "support_abandon", "purchase_list", "txo_list",
    "sync_hash", "sync_apply",
    "preference_get", "preference_set",
    // "comment_list", "comment_create", "comment_hide", "comment_abandon", "comment_update"
]

class LBRYManager {
    constructor() {
        this._isConnected = false;
        this._connectPromise = null;
        this._daemonConnectionString = config.LBRYNET;
        // this._alternateConnectionString = '';
        this._methodsUsingAlternateConnectionString = [];
        this._apiRequestHeaders = { 'Content-Type': 'application/json-rpc' };
        this.connect();

        // Add all methods
        methods.forEach(method=>{
            this[method] = (params={})=>apiCall(method, params);
        });
    }

    connect() {
        if (this._connectPromise === null) {
            this._connectPromise = new Promise((resolve, reject)=>{
                let tryNum = 0;

                const checkDaemonStarted = async ()=>{
                    tryNum++;

                    try {
                        const resp = await LBRY.status();
                        this._isConnected = true;
                        resolve(resp);
                    } catch {
                        if (tryNum <= CHECK_DAEMON_STARTED_TRY_NUMBER) {
                            setTimeout(checkDaemonStarted, tryNum < 50 ? 400 : 1000);
                        } else {
                            reject(new Error('Unable to connect to LBRY'));
                        }
                    }
                }

                checkDaemonStarted();
            })
        }

        return this._connectPromise;
    }

    getConnected() {
        return this._isConnected;
    }
}

async function apiCall(method, params={}) {
    return new Promise(async (resolve, reject)=>{
        const time = new Date().getTime();
    
        let res;
        try {
            res = await fetch(config.LBRYNET, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json-rpc',
                    'Content-Type': 'application/json-rpc'
                },
                body: JSON.stringify({
                    jsonrpc: "2.0",
                    method,
                    params,
                    id: time
                })
            });
        } catch {
            reject();
        }

        if (!res) return;
    
        
        if (!(res.status >= 200 && res.status < 300)) return reject(res);

        const json = await res.json();

        if (json.error) {
            console.error(typeof json.error === 'object' ? json.error.message : json.error);
            return reject(json);
        }

        return resolve(json.result);
    });

}

const LBRY = new LBRYManager();
export default LBRY;