// import axios from 'axios';
import { pipeline } from 'stream';

const invidious = "https://inv.nadeko.net";

export async function GET({params, request}) {
    console.log(params);
    
    let storyboards = [];

    try {
      const resp = (await (await fetch(invidious + '/api/v1/videos/' + params.id)).json());
      console.log(resp);
      
      if (!resp.error) {
        storyboards = resp.storyboards;
        captions = resp.captions;
      }
    } catch {
      // Probably, Invidious is broken right now...
    }
    // const storyboard = storyboards[storyboards.length-1];
    // console.log(storyboards[storyboards.length-1]);

    // // If there were an error trying to find the thumbnail or if it doesn't exist
    // if (resp.error || !resp.items.length || !resp.items[0] || !resp.items[0].value || !resp.items[0].value.thumbnail || !resp.items[0].value.thumbnail.url) {
    //     return new Response(`${params.id} not found`, {
    //         status: 404,
    //         headers: {
    //             'Content-Type': 'text/plain',
    //         },
    //     });
    // }

    
    try {
        console.log("Fetching", invidious + storyboards[storyboards.length-1].url);
        
        const data = await fetch(invidious + storyboards[storyboards.length-1].url);

        // console.log(await data.text());
        
    
        return new Response(await data.blob(), { headers: { 'Content-Type': data.headers.get('content-type'), 'Cache-Control': 'public, max-age=86400, immutable'} });

    } catch (err) {
        console.log("Failed to proxy thumbnail: " + params.id);
        return new Response("\n", { headers: { 'Content-Type': 'text/plain'} });
    }
}