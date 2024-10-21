// import axios from 'axios';
import { pipeline } from 'stream';

import LBRY from "../../../utils/LBRY";

export async function GET({params, request}) {
    const resp = await LBRY('claim_search', {
        claim_id: params.id
    })

    const get = await LBRY('get', {
        uri: resp.items[0].permanent_url.replace('lbry://', '').replace('#', ':')
    });


    const data = await fetch(`http://localhost:5280/stream/${get.sd_hash}`);

    return new Response(await data.blob(), { headers: { 'Content-Type': data.headers.get('content-type')} });

    // return fetch(resp.items[0].value.thumbnail.url)
    //   .then((response) => response.body)
    //   .then((data) => {
    //     return new Response(JSON.stringify(data), {
    //     //   headers: { 'Content-Type': 'application/json' },
    //     });
    //   })


    // console.log(resp.items[0].value.thumbnail.url);
    // return new Response(new ReadableStream(fetch(resp.items[0].value.thumbnail.url)), { status: 200, statusText: "SuperSmashingGreat!" });
    // return await fetch(resp.items[0].value.thumbnail.url);
    try {

    } catch (err) {
        console.log("Failed to proxy thumbnail: " + params.id);
        return await fetch('https://lbry.se/image?url=aHR0cHM6Ly90aHVtYm5haWxzLmxicnkuY29tL1FRdTFfYmYxQmRv&hash=210a3eabab688ae8409ec3b9f617ef1f0653577992fd2a4468aaeb72f248e9e3&w=480');
    }
}