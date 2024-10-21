// import axios from 'axios';
import { pipeline } from 'stream';

import LBRY from "../../../utils/LBRY";

export async function GET({params, request}) {
    const resp = await LBRY.claim_search({
        claim_id: params.id
    });
    // If there were an error trying to find the thumbnail or if it doesn't exist
    if (resp.error || !resp.items.length || !resp.items[0] || !resp.items[0].value || !resp.items[0].value.thumbnail || !resp.items[0].value.thumbnail.url) {
        return new Response(`${params.id} not found`, {
            status: 404,
            headers: {
                'Content-Type': 'text/plain',
            },
        });
    }

    
    try {
        const data = await fetch(resp.items[0].value.thumbnail.url);
    
        return new Response(await data.blob(), { headers: { 'Content-Type': data.headers.get('content-type'), 'Cache-Control': 'public, max-age=86400, immutable'} });

    } catch (err) {
        console.log("Failed to proxy thumbnail: " + params.id);
        return await fetch('https://lbry.se/image?url=aHR0cHM6Ly90aHVtYm5haWxzLmxicnkuY29tL1FRdTFfYmYxQmRv&hash=210a3eabab688ae8409ec3b9f617ef1f0653577992fd2a4468aaeb72f248e9e3&w=480');
    }
}