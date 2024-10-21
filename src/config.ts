export default {
    LBRYNET: process.env.LBRYNET || "http://localhost:5279/",
    PLAYER_SERVER: process.env.PLAYER_SERVER || "http://localhost:5280/get/{claimName}/{claimId}",
    THUMBNAIL_SERVER: (claim)=>{
        return process.env.THUMBNAIL_SERVER ? process.env.THUMBNAIL_SERVER.replaceAll('{id}', claim.claim_id) : `/$/thumbnail/${claim.claim_id}`
    }
}