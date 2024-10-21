import LBRY from "./utils/LBRY";

export function onRequest (context, next) {

    // if (!LBRY.getConnected()) return new Response("Not connected to LBRYnet!");
    // // intercept data from a request
    // // optionally, modify the properties in `locals`
    // context.locals.title = "New title";

    // return a Response or the result of calling `next()`
    return next();
};