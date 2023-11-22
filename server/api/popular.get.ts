import { Movie } from "~/types/movie";

export default defineEventHandler(async(event)  => {
    const myAutoarization = process.env.MY_AUTOARIZATION;

    return (await $fetch('https://api.themoviedb.org/3/movie/popular', {
        headers: {
            Authorization: myAutoarization as string,
            accept: 'application/json'
        },
    })).results;

});