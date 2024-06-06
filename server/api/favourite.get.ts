import jwt from 'jsonwebtoken';
import prisma from '~/db';

export default defineEventHandler(async(event) => {
    const { token } = await getQuery(event);

    const verified = jwt.verify(token, 'anaikin');
    const userId = verified.id;

    const response = await prisma.like.findMany({
        where: {
            userId,
        }
    });
    return response;
    // Maybe if in need only movieIds, then can go this ===>  return response.map((like) => like.movieId)
});
