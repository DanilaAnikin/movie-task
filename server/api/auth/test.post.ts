import jwt from 'jsonwebtoken';
import prisma from '~/db';


export default defineEventHandler(async(event) => {
    const {token}: {token: string} = await readBody(event);

    const verified = jwt.verify(token, 'anaikin');
    const userId = verified.id;

    return prisma.user.findUnique({
        where: {
            id: userId
        }
    });
});