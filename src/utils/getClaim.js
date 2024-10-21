import LBRY from "./LBRY";

export default async (urls)=> {
    let result;
    try {
        const resp = await LBRY.resolve({
            urls
        });

        result = Object.values(resp)[0];
        if (result.value_type === 'repost') {
            // console.log(result);
            return { redirect: `${result.reposted_claim.canonical_url.replaceAll('#', ':').replace('lbry://', '/')}`};
        }
    
    } catch {
        result = {error: "error"}
    }
    
    return result;
}