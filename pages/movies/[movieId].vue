<script setup lang="ts">
import { Genre } from '~/types/genre';
import { Movie } from '~/types/genre';
import { reactive, computed, ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const movieId = route.params.movieId;
const {data:movie} = await useFetch('/api/movie', {
    query: {
        id: movieId
    }
});


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
                <span class="text-xl">{{ movie.genres.map(item => item.name).join(', ') }}</span>
                <div class="flex gap-6 flex-wrap">
                    <span class="text-lg">Rating average: {{ movie?.vote_average }}/10</span>
                    <span class="text-lg">Total ratings: {{ movie?.vote_count }}</span>
                </div>
            </div>
        </div>
    </div>
</template>