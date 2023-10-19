<script setup lang="ts">
import { Movie } from '~/types/movie';
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline';

const searchValue = ref<string>("");
const movies = ref<Movie[] | null>(null);
const movieOpened = ref<boolean>(false);
const openedMovie = ref<Movie>();

async function getMovies() {
    const data = await $fetch('/api/search', {
        query: {
            query: searchValue.value ? searchValue.value : 'BROS' 
        }
    });
    
    setTimeout(() => {
        movies.value = data;
        searchValue.value = '';
    }, 200);
}

onMounted(getMovies);
</script>

<template>
    <div v-if="!movieOpened">
        <span class="w-full flex justify-center text-5xl font-bold py-8 text-slate-100">
            Movies
        </span>
        <div class="flex justify-center items-center h-fit mt-3 mb-10">
            <input type="text" v-on:keyup.enter="getMovies" v-model="searchValue" placeholder="Search..." class="bg-slate-400 rounded p-2 placeholder:text-slate-900 text-slate-900 focus:outline-none focus:bg-slate-300">
            <MagnifyingGlassIcon class="h-6 w-6 ml-2 cursor-pointer hover:text-blue-400" @click="getMovies" />
        </div>
        <div class="flex-wrap flex justify-center gap-4">
            <MovieComponent
                v-for="movie in movies"
                :key="movie.id"
                :movie="movie"
                @open-movie="movieOpened = true; openedMovie=$event"
            />
        </div>
    </div>
    <div v-else>
        <MovieDetails :movie="openedMovie" />
    </div>
</template>
