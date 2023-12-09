import prisma from '~/db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
// import Bun from 'bun';

export default defineEventHandler(async(event) => {
    const { email, password }: {email: string, password: string} = await readBody(event);

    const existingUser = await prisma.user.findUnique({
        where: {
            email,
        }
    });

    if(existingUser){
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

        const verified = await bcrypt.compare(password, user.password);

        if(!verified){
            return "Stooopid";
        }

        const userJwt = jwt.sign({
            id: user.id,
            email: user.email
        }, 'anaikin');

        return userJwt;   
    } else {
        const newPasswordHash =  await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                email,
                password: newPasswordHash,
            },
            select: {
                id: true,
                email: true,
                password: true,
            }
        });

        const userJwt = jwt.sign({
            id: newUser.id,
            email: newUser.email
        }, 'anaikin');

        return userJwt;
    }
})