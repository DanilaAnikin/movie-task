import { Movie } from "~/types/movie";

export default defineEventHandler(async(event)  => {
    const query = getQuery(event);
    const search = query.query;

    const url = new URL('https://api.themoviedb.org/3/search/movie')
    url.searchParams.set('query', search as string)

    const response = await fetch(url, {
        headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwOWQ3ZTRlYWQxYmQ3MDk2ZTBmNGI2YzU2ZGE5NTFhOCIsInN1YiI6IjYxNDYxOTgzMmRmZmQ4MDA5MjEzMWVkZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fakHFAMHAkzA4EKmmo2h_nKlDRMFh3bSW91GKmiC0ig'
            ,accept: 'application/json'
        }
    });

    return (await response.json()).results as Movie[];
})