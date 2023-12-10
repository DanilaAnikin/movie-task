import prisma from '~/db';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const movieIds = body.movieIds || [];

    if(!movieIds.length){
        return [];
    }

    const likes = await prisma.like.groupBy({
        where: {
            movieId: {
                in: movieIds,
            }
        },
        _count: {
            _all: true
        },
        by: ['movieId'],
    });

    return likes.reduce((acc: {[k: number]: number}, current) => {
        acc[current.movieId] = current._count._all;
        return acc;
    }, {})
})