import jwt from 'jsonwebtoken';
import prisma from '~/db';

export default defineEventHandler(async(event) => {
    const { movieId, token }: {movieId: number, token: string} = await readBody(event);

    const verified = jwt.verify(token, 'anaikin');
    const userId = verified.id;

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

    return await prisma.like.delete({
        where: {
            userId_movieId: {
                userId,
                movieId
            }
        }
    });
});
