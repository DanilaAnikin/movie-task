<script setup lang="ts">
import { HomeIcon } from '@heroicons/vue/24/outline';
import { useUser } from '../store/idkNazev';
import { onMounted } from 'vue';

const userStore = useUser();

const { data: movies } = await useFetch('/api/popular');
const { data: genres } = await useFetch('/api/genres');

onMounted(async() => {
    if(userStore.token){
        await userStore.loadUser();
    }
})
</script>

<template>
    <div class="flex flex-col gap-10">
        <div class="px-8 mt-10 flex justify-between items-center">
            <span class="text-slate-100 text-3xl font-bold">
                Favourite movies:
            </span>
            <NuxtLink to="/"><HomeIcon class="h-12 w-12 hover:bg-slate-400 hover:bg-opacity-30 hover:text-blue-400 rounded-xl p-1" /></NuxtLink>
        </div>
        <div class="flex-wrap flex justify-center gap-4">
            <MovieComponent
                v-for="movie in movies"
                :key="movie.id"
                :movie="movie"
                :genres="genres!"
            />  
        </div>
    </div>
</template>