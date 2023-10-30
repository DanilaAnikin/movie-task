import jwt from 'jsonwebtoken';
import prisma from '~/db';

export default defineEventHandler(async(event) => {
    console.log(event.req.headers.authorization);
    const token = event.req.headers.authorization.split(' ')[1];

    const verified: {id: number} = jwt.verify(token, 'anaikin');

    console.log(verified);

    const foundUser = await prisma.user.findUnique({
        where: {
            id: verified.id,
        },
        select: {
            id: true,
            email: true
        }
    });

    console.log(foundUser);
    return foundUser
})