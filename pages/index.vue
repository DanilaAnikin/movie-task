<script setup lang="ts">
import { MagnifyingGlassIcon, UserCircleIcon } from '@heroicons/vue/24/outline';
import { useUser } from '../store/idkNazev';

const userStore = useUser();

const emit = defineEmits(['not-logged'])

const searchValue = ref<string>("");
const {data: movies} = await useFetch('/api/popular');
const {data: genres} = await useFetch('/api/genres');

const movieOpened = ref<boolean>(false);

async function getMovies() {
    const data = await $fetch('/api/search', {
        query: {
            query: searchValue.value ? searchValue.value : 'BROS' 
        }
    });
    movies.value = data;
    searchValue.value = '';
}

onMounted(async() => {
    if(userStore.token){
        await userStore.loadUser();
    } else {
        emit('not-logged');
    }
});
</script>

<template>
    <div v-if="!movieOpened">
        <div class="flex justify-between px-8 h-32 items-center">
            <span class="flex text-4xl font-bold text-slate-100">
                MyMovies
            </span>
            <div class="flex items-center gap-2">
                <input type="text" v-on:keyup.enter="getMovies" v-model="searchValue" placeholder="Search..." class="bg-slate-400 rounded p-2 placeholder:text-slate-900 text-slate-900 focus:outline-none focus:bg-slate-300">
                <MagnifyingGlassIcon class="h-6 w-6 cursor-pointer hover:text-blue-400" @click="getMovies" />
            </div>
            <div class="flex">
                <nuxt-link to="/UserComponent">
                    <UserCircleIcon class="h-10 w-10 text-slate-200 cursor-pointer" />
                </nuxt-link>
            </div>
        </div>
        <div class="flex-wrap flex justify-center gap-4">
            <NuxtLink v-for="movie in movies" :key="movie.id" :to="`/movies/${movie.id}`">
                <MovieComponent
                    :movie="movie"
                    :genres="genres!"
                />
            </NuxtLink>
        </div>
    </div>
</template>
