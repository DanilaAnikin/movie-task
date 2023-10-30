import prisma from '~/db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
// import Bun from 'bun';

export default defineEventHandler(async(event) => {
    const {email, password}: {email: string, password: string} = await readBody(event);

    const user = await prisma.user.findUnique({
        where: {
            email,
        },
        select: {
            id: true,
            email: true,
            password: true,
        }
    });

    if(!user){
        return;
    }

    const verified = await bcrypt.compare(password, user.password);

    if(!verified){
        return "Stooopid";
    }

    const userJwt = jwt.sign({
        id: user.id,
        email: user.email
    }, 'anaikin');

    return userJwt;
})