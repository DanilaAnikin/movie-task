<script setup lang="ts">
import { useRoute } from 'vue-router';
import { HomeIcon } from '@heroicons/vue/24/outline';
import { HeartIcon } from '@heroicons/vue/24/solid';

const route = useRoute();
const movieId = route.params.movieId;
const {data:movie} = await useFetch('/api/movie', {
    query: {
        id: movieId
    }
});


</script>
<template>
    <NuxtLink to="/" class="absolute top-10 right-8">
        <HomeIcon class="h-12 w-12 text-slate-200 hover:bg-slate-300 hover:bg-opacity-30 hover:text-blue-400 rounded-xl p-1" />
    </NuxtLink>
    <div class="ml-10 mt-60 w-fit h-fit rounded-xl flex pr-8 gap-10 flex-wrap mb-20">
        <img :src="`https://image.tmdb.org/t/p/w500${movie?.poster_path}`" class="border border-slate-600 rounded-l-3xl rounded-r-lg">
        <div class="flex flex-col justify-between gap-6 max-w-5xl py-5">
            <div class="flex flex-col gap-6">
                <div class="flex justify-between items-center">
                    <span class="text-4xl font-bold">{{ movie?.original_title }}</span>
                    <HeartIcon :class="`h-10 w-10 ${ true ? 'text-red-600 hover:text-red-500' : 'text-slate-100 hover:text-red-400'}`" />
                </div>
                <span class="text-2xl text-slate-300">{{ movie?.overview }}</span>
            </div>
            <div class="flex justify-between items-center flex-wrap">
                <span class="text-xl">Genres: {{ movie.genres.map(item => item.name).join(', ') }}</span>
                <div class="flex gap-6 flex-wrap">
                    <span class="text-lg">Rating average: {{ movie?.vote_average.toFixed(1) }}/10</span>
                    <span class="text-lg">Total ratings: {{ movie?.vote_count }}</span>
                </div>
            </div>
        </div>
    </div>
</template>