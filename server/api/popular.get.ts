export default defineEventHandler(async(event)  => {
    const myAutoarization = process.env.MY_AUTOARIZATION;

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

    const response =  results.map(res => ({...res, likes: likes[res.id] || 0}))
    console.log(response.length);
    return response;
});