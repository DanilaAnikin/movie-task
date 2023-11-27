import jwt from 'jsonwebtoken';
import prisma from '~/db';

export default defineEventHandler(async(event)  => {
    const { token } = getQuery(event);

    const verified = jwt.verify(token, 'anaikin');
    const userId = verified.id;

    const likes = await prisma.like.findMany({
        where: {
            userId
        }
    })
    return likes;
});
