export default defineEventHandler(async(event)  => {
    const myAutoarization = process.env.MY_AUTOARIZATION;

    // return (await $fetch('https://api.themoviedb.org/3/movie/popular', {
    //     headers: {
    //         Authorization: myAutoarization as string,
    //         accept: 'application/json'
    //     },
    // })).results;

    const {results} = await $fetch('https://api.themoviedb.org/3/movie/popular', {
        headers: {
            Authorization: myAutoarization as string,
            accept: 'application/json'
        },
    });

    const likes = await $fetch('/api/like_count', {
        method:'POST',
        body: {
            movieIds: results.map((movie) => movie.id)
        }
    });

    return results.map(res => ({...res, likes: likes[res.id] || 0}))
});