import { Movie } from "~/types/movie";
import jwt from 'jsonwebtoken';
import prisma from '~/db';

export default defineEventHandler(async(event)  => {
    const query = getQuery(event);
    const search = query.query;

    const token = query.token;
    const verified = jwt.verify(token, 'anaikin');
    const userId = verified.id;

    const myAutoarization = process.env.MY_AUTOARIZATION;
    const movieUrl = process.env.MOVIE_URL;

    const url = new URL(movieUrl as string);
    url.searchParams.set('query', search as string);

    const { results } = await $fetch(url, {
        headers: {
            Authorization: myAutoarization as string,
            accept: 'application/json'
        }
    });

    const [likes, likesByUser] = await Promise.allSettled([
        $fetch('/api/like_count', {
            method:'POST',
            body: {
                movieIds: results.map((movie) => movie.id)
            }
        }),
        prisma.like.findMany({
            where: {
                AND: {
                    userId,
                    movieId: {
                        in: results.map((movie) => movie.id)
                    }
                }
            }
        })
    ]);

    const likesByUserMap = likesByUser.reduce((acc: {[k: number]: boolean}, current) => {
        acc[current.movieId] = true;
        return acc;
    }, {});

    const return_response = (results.filter((movie: Movie) => movie.poster_path != null && movie.overview != "") as Movie[]).map(res => ({...res, likes: likes[res.id] || 0, liked: likesByUserMap[res.id] || false}));
    return return_response;
});