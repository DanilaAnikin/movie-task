import prisma from '~/db';
import jwt from 'jsonwebtoken';
import { type Movie } from '~/types/movie';

export default defineEventHandler(async(event)  => {
    const { token } = getQuery(event);
    const verified = jwt.verify(token, 'anaikin');
    const userId = verified.id;

    const myAutoarization = process.env.MY_AUTOARIZATION;

    const { results } = await $fetch<{results: Omit<Movie, 'likes' | 'liked'>[]}>('https://api.themoviedb.org/3/movie/popular', {
        headers: {
            Authorization: myAutoarization as string,
            accept: 'application/json'
        },
    });

    const [likes, likesByUser] = await Promise.all([
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

    const response = results.map(res => ({...res, likes: likes[res.id] || 0, liked: likesByUserMap[res.id] || false}))
    return response;
});