<script setup lang=ts>
import { Movie } from '~/types/movie';

const emit = defineEmits(['close']);

defineProps<{
    movie: Movie
}>()
</script>

<template>
    <div class="mx-20 mt-60 w-fit rounded-xl flex gap-20">
        <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" class="rounded-2xl">
        <div class="flex flex-col justify-between">
            <div class="flex flex-col gap-6">
                <span class="text-4xl font-bold">{{ movie.original_title }}</span>
                <span class="text-2xl text-slate-300">{{ movie.overview }}</span>
            </div>
            <div class="flex gap-6">
                <span class="text-xl">Rating average: {{ movie.vote_average }}/10</span>
                <span class="text-xl">Total ratings: {{ movie.vote_count }}</span>
            </div>
        </div>
    </div>
</template>