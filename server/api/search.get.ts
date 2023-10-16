import { Movie } from "~/types/movie";

export default defineEventHandler(async(event)  => {
    const query = getQuery(event);
    const search = query.query;

    const myAutoarization = process.env.MY_AUTOARIZATION;
    const myUrl = process.env.MY_URL;

    const url = new URL(myUrl as string)
    url.searchParams.set('query', search as string)

    const response = await fetch(url, {
        headers: {
            Authorization: myAutoarization as string,
            accept: 'application/json'
        }
    });

    return (await response.json()).results as Movie[];
})