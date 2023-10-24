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
        <div class="relative overflow-hidden">
            <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" class="rounded-l-lg rounded-r-sm border-2 border-slate-800" />
            <div v-if="movie.vote_average != 0" class="absolute right-0 bottom-0">
                <div class="text-lg absolute transform -rotate-45 bg-red-800 border-2 border-red-900 text-center text-white font-bold py-1 left-[-130px] top-[-60px] w-[170px]">
                    {{ movie.vote_average }}
                </div>
            </div>
        </div>
        <div class="pl-3 mt-2 flex flex-col justify-between">
            <div class="mt-2">
                <span class="block text-lg font-bold mb-1 text-ellipsis overflow-hidden">{{ movie.original_title }}</span>
                <span class="text-xs">{{movie.genre_ids.length > 1 ? 'Genres: ' : 'Genre: ' }} {{ getGenreNames.join(', ') }}</span>
            </div>
        </div>
    </div>
</template>
