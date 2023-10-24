import { Genre } from "~/types/genre";

export default defineEventHandler(async()  => {
    const myAutoarization = process.env.MY_AUTOARIZATION;
    const genreUrl = process.env.GENRE_URL;

    const url = new URL(genreUrl as string);

    const response = await fetch(url, {
        headers: {
            Authorization: myAutoarization as string,
            accept: 'application/json'
        }
    });

    return (await response.json()).genres as Genre[];
});
