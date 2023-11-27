import prisma from '~/db';

export default defineEventHandler(async(event) => {
    const {movieId, userId}: {movieId: number, userId: number} = await readBody(event);

    const like = await prisma.user.likes.create({
        userId,
        movieId,
    })
});