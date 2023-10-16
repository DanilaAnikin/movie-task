<script setup lang="ts">
import { Movie } from '~/types/movie';

defineProps<{
    movie: Movie
}>();
const emit = defineEmits<{
    openMovie: [value: Movie]
}>()
</script>

<template>
    <div class="max-w-xs flex cursor-pointer rounded-lg bg-slate-800" @click="emit('openMovie', movie)">
        <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" class="w-32 h-fit rounded-l-lg" />
        <div class="pl-3 py-1 flex flex-col justify-between">
            <div>
                <span class="block text-lg font-bold mb-1">{{ movie.original_title }}</span>
                <span class="text-sm text-slate-400 line-clamp-4">{{ movie.overview }}</span>
            </div>
            <div class="flex gap-4">
                <span class="text-xs">{{ movie.vote_average }}/10</span>
                <span class="text-xs">Ratings: {{ movie.vote_count }}</span>
            </div>
        </div>
    </div>
</template>