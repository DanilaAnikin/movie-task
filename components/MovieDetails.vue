<script setup lang=ts>
import { Movie } from '~/types/movie';
import { Genre } from '~/types/genre';

const emit = defineEmits(['close']);

const props = defineProps<{
    movie: Movie,
    genres: Genre[], 
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
    <div class="ml-10 mt-60 w-fit h-fit rounded-xl flex pr-8 gap-10 flex-wrap mb-20">
        <img :src="`https://image.tmdb.org/t/p/w500${movie?.poster_path}`" class="border border-slate-600 rounded-l-3xl rounded-r-lg">
        <div class="flex flex-col justify-between gap-6">
            <div class="flex flex-col gap-6">
                <span class="text-4xl font-bold">{{ movie?.original_title }}</span>
                <span class="text-2xl text-slate-300">{{ movie?.overview }}</span>
            </div>
            <div class="flex justify-between items-center flex-wrap">
                <span class="text-2xl">{{ getGenreNames.join(', ') }}</span>
                <div class="flex gap-6 flex-wrap">
                    <span class="text-lg">Rating average: {{ movie?.vote_average }}/10</span>
                    <span class="text-lg">Total ratings: {{ movie?.vote_count }}</span>
                </div>
            </div>
        </div>
    </div>
</template>