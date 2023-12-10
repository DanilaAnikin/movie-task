import prisma from '~/db';

export default defineEventHandler(async(event)  => {
    const { id } = getQuery(event);

    const myAutoarization = process.env.MY_AUTOARIZATION;

    const likes = await prisma.like.count({
        where: {
            movieId: Number(id)
        }
    });

    return {...(await $fetch(`https://api.themoviedb.org/3/movie/${id}`, {
        headers: {
            Authorization: myAutoarization as string,
            accept: 'application/json'
        },
    })), likes};

});