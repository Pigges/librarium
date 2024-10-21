import LBRY from "./LBRY";
import config from "../config";

export default (claimName, claimId)=>{
    return config.PLAYER_SERVER.replaceAll('{claimName}', claimName).replaceAll('{claimId}', claimId);
}