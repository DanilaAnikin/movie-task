<script setup lang="ts">
import { Genre } from '~/types/genre';
import { Movie } from '~/types/movie';

const props = defineProps<{
    movie: Movie,
    genres: Genre[]
}>();
const emit = defineEmits<{
    openMovie: [value: Movie]
}>()

let genreNames = reactive<string[]>([])
const getGenreNames = computed(() => {
    for (let i=0; i<props.genres.length; i++) {
        for(let j=0; j<props.movie.genre_ids.length; j++) {
            if(props.movie.genre_ids[j] == props.genres[i].id){
                genreNames.push(props.genres[i].name);
            }
        }
    }
    return genreNames;
})
</script>

<template>
    <div class="cursor-pointer rounded-lg mb-4 max-w-xs" @click="emit('openMovie', movie)">
        <div class="relative overflow-hidden movie-card">
            <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" class="rounded-l-lg rounded-r-sm border-2 border-slate-800" />
            <div v-if="movie.vote_average != 0" class="absolute right-0 bottom-0 rating">
                <div class="text-lg absolute transform -rotate-45 bg-red-800 border-2 border-red-900 text-center text-white font-bold py-1 left-[-370px] top-[-460px] w-[170px]">
                    {{ movie.vote_average.toFixed(1) }}
                </div>
            </div>
            <div class="absolute bottom-0 left-0 right-0 bg-slate-950 text-container border-b border-x border-slate-800 transition-all duration-700">
                <span class="block text-lg font-bold mb-1 text-ellipsis overflow-hidden">{{ movie.original_title }}</span>
                <span class="movie-text text-xs">{{ movie.genre_ids.length > 1 ? 'Genres: ' : movie.genre_ids.length == 0 ? '' : 'Genre: ' }} {{ getGenreNames.join(', ') }}</span>
                <span class="movie-text text-xs flex flex-wrap mt-2">{{ movie.overview }}</span>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.movie-card {
    .movie-text {
        display: none;
        height: 0;
    }
    &:hover {
        .movie-text {
            display: flex;
            flex-direction: column;
            height: auto;
            transition: opacity 0.3s;
        }
        .text-container {
            border-radius: 10px 10px 0 0;
            padding: 12px;
        }
    }
    .text-container {
        padding: 4px 8px 4px 12px;
    }
}
</style>