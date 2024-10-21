import LBRY from "../../../utils/LBRY";

export async function GET({params, request}) {
    
    const claim = await LBRY.claim_search({
        claim_type:[
            "channel",
        ],
        claim_id: params.id
    });

    // If there were an error trying to find the thumbnail or if it doesn't exist
    if (claim.error || !claim.items.length || !claim.items[0] || !claim.items[0].value || !claim.items[0].value.cover || !claim.items[0].value.cover.url) {
        return new Response(`${params.id} not found`, {
            status: 404,
            headers: {
                'Content-Type': 'text/plain',
            },
        });
    }
    
    try {
        const data = await fetch(claim.items[0].value.cover.url);
        console.log(data.headers.get('content-type'));
        return new Response(await data.blob(), { headers: { 'Content-Type': data.headers.get('content-type'), 'Cache-Control': 'public, max-age=86400, immutable'} });
    } catch (err) {
        console.log("Failed to proxy thumbnail: " + params.id);
        return new Response('500 Internal Server Error', {
            status: 500,
            headers: {
                'Content-Type': 'text/plain',
            },
        });
    }
}