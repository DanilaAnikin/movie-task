import jwt from 'jsonwebtoken';
import prisma from '~/db';

export default defineEventHandler(async(event) => {
    const { token } = await getQuery(event);

    const verified = jwt.verify(token, 'anaikin');
    const userId = verified.id;

    const response = await prisma.like.findMany({
        where: {
            userId,
        },
        include: {
            movie: true
        }
    });
    return response;
});
