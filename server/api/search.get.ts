import { Movie } from "~/types/movie";

export default defineEventHandler(async(event)  => {
    const query = getQuery(event);
    const search = query.query;

    const myAutoarization = process.env.MY_AUTOARIZATION;
    const movieUrl = process.env.MOVIE_URL;

    const url = new URL(movieUrl as string);
    url.searchParams.set('query', search as string);

    const response = await fetch(url, {
        headers: {
            Authorization: myAutoarization as string,
            accept: 'application/json'
        }
    });

    const data = await response.json();

    return data.results.filter((movie: Movie) => movie.poster_path != null && movie.overview != "") as Movie[];
});