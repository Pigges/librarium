import generateContentUrl from "../../../../utils/generateContentUrl";
import LBRY from "../../../../utils/LBRY";

export async function GET({params, redirect}) {
    return redirect(generateContentUrl(params.claimName, params.claimId));
}