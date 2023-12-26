import jwt from 'jsonwebtoken';
import prisma from '~/db';
import { Movie } from '~/types/movie';

export default defineEventHandler(async(event) => {
    const { movieId, token }: {movieId: number, token: string} = await readBody(event);

    const verified = jwt.verify(token, 'anaikin');
    const userId = verified.id;

    const myAutoarization = process.env.MY_AUTOARIZATION;

    const liked = await prisma.like.findUnique({
        where: {
            userId_movieId: {
                userId,
                movieId,
            }
        }
    });

    if(!liked) {
        return await prisma.like.create({ data: { userId, movieId } });
    }

    await prisma.like.delete({
        where: {
            userId_movieId: {
                userId,
                movieId
            }
        }
    });

    const { results } = await $fetch<{ results: Movie }>(`https://api.themoviedb.org/3/movie/${movieId}`, {
        headers: {
            Authorization: myAutoarization as string,
            accept: 'application/json'
        }
    });

    const response = await prisma.movie.findUnique({
        where: {
            id: movieId
        }  
    })

    if(response){
        return;
    }

    await prisma.movie.create({
        data: {
            id: results.id,
            title: results.title,
            overview: results.overview,
            genreIds: results.genre_ids.join(','),
            voteCount: results.vote_count,
            voteAverage: results.vote_average,
            posterPath: results.poster_path,
        }
    })
});
