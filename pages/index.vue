<script setup lang="ts">
import { HeartIcon, PaperAirplaneIcon } from '@heroicons/vue/24/outline';
import { useUser } from '../store/idkNazev';
import { Movie } from '~/types/movie';

const userStore = useUser();
const router = useRouter();

const searchValue = ref<string>("");

const { data: movies } = await useFetch('/api/popular', {
    query: {
        token: userStore.token,
    }
});
const { data: genres } = await useFetch('/api/genres');

const movieOpened = ref<boolean>(false);

async function getMovies() {
    if(searchValue.value) {
        movies.value = await useFetch('/api/search', {
            query: {
                query: searchValue.value 
            }
        });
    } else {
        movies.value = await useFetch('/api/popular', {
            query: {
                token: userStore.token
            }
        });
    }

    searchValue.value = '';
}

async function postLike(movie: Movie, liked: boolean) {
    movie.liked = liked;

    if(liked) {
        movie.likes++
    } else {
        movie.likes --;
    }

    const token = userStore.token;

    await $fetch('/api/auth/like', {
        method: 'POST',
        body: {
            movieId: movie.id,
            token
        }
    });
}

onMounted(async() => {
    if(userStore.token){
        await userStore.loadUser();
    } else {
        router.push('/Login');
    }
});
</script>

<template>
    <div v-if="!movieOpened">
        <div class="flex justify-between px-8 h-32 items-center flex-wrap gap-2">
            <span class="flex text-4xl font-bold text-slate-100">
                MyMovies
            </span>
            <div class="flex items-center gap-2">
                <input type="text" v-on:keyup.enter="getMovies" v-model="searchValue" placeholder="Search..." class="bg-slate-300 rounded p-2 w-60 placeholder:text-slate-900 text-black font-mono focus:outline-none focus:bg-slate-200">
                <PaperAirplaneIcon class="h-9 w-9 p-1 hover:bg-slate-300 hover:bg-opacity-30 rounded-lg cursor-pointer hover:text-blue-400" @click="getMovies" />
            </div>
            <div class="flex">
                <NuxtLink to="/FavouriteMovies">
                    <HeartIcon class="h-12 w-12 text-slate-200 cursor-pointer hover:bg-slate-400 hover:bg-opacity-30 hover:text-red-500 rounded-xl p-1" />
                </NuxtLink>
            </div>
        </div>
        <div class="flex-wrap flex justify-center gap-4">
            <MovieComponent
                v-for="movie in movies"
                :key="movie.id"
                :movie="movie"
                :likes="movie.likes"
                :genres="genres!"
                @post-like="postLike(movie, $event)"
            />
        </div>
    </div>
</template>
