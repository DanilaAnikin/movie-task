import { Movie } from "~/types/movie";

export default defineEventHandler(async(event)  => {
    const {id} = getQuery(event);

    const myAutoarization = process.env.MY_AUTOARIZATION;

    return await $fetch(`https://api.themoviedb.org/3/movie/${id}`, {
        headers: {
            Authorization: myAutoarization as string,
            accept: 'application/json'
        },
    });

});