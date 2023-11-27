<script setup lang="ts">
import { Genre } from '~/types/genre';
import { Movie } from '~/types/movie';
import { HeartIcon, StarIcon, ArrowRightCircleIcon } from '@heroicons/vue/24/solid';
import { useUser } from '~/store/idkNazev';

const userStore = useUser();

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

const { data: likes } = await useFetch('/api/likes', {
    query: {
        token: userStore.token
    }
});

const likedMovies = ref<number[]>([]);

if(likes.value){
    for(let i=0; i<likes.value.length; i++) {
        likedMovies.value.push(likes.value[i].movieId);
    }
}

const liked = ref<boolean>(likedMovies.value.includes(props.movie.id));

async function postLike() {
    liked.value = !liked.value;

    const token = userStore.token;
    const movieId = props.movie.id;

    const data = await $fetch('/api/auth/like', {
        method: 'POST',
        body: {
            movieId,
            token
        }
    });
}

</script>

<template>
    <div class="rounded-lg mb-4 max-w-xs">
        <div class="relative overflow-hidden movie-card">
            <img @click="emit('openMovie', movie)" :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" class="rounded-l-lg rounded-r-sm border-2 border-slate-700" />
            <div class="absolute right-0 top-0">
                <div v-if="movie.vote_average != 0">
                    <div class="text-lg absolute transform -rotate-45 bg-red-800 border-2 border-red-900 text-center text-white font-bold py-1 left-[-370px] top-[15px] w-[170px]">
                        {{ movie.vote_average.toFixed(1) }}
                    </div>
                </div>
                <div class="absolute top-2 right-2">
                    <NuxtLink :to="`/movies/${movie.id}`">
                        <ArrowRightCircleIcon class="h-10 w-10 text-slate-300 cursor-pointer hover:text-slate-400" />
                    </NuxtLink>
                </div>
            </div>
            <div class="cursor-default absolute bottom-0 left-0 right-0 bg-slate-800 text-container rounded-t-lg border-b border-x border-slate-700 transition-all duration-700">
                <span class="text-lg font-bold mb-1 gap-1 flex items-center text-ellipsis overflow-hidden mt-1">{{ movie.original_title }}</span>
                <span class="movie-text text-xs">{{ movie.genre_ids.length > 1 ? 'Genres: ' : movie.genre_ids.length == 0 ? '' : 'Genre: ' }} {{ getGenreNames.join(', ') }}</span>
                <span class="movie-text text-xs flex flex-wrap mt-2">{{ movie.overview }}</span>
                <div class="movie-text-like justify-between mt-2 w-full">
                    <span v-if="movie.vote_average != 0" class="flex font-bold text-lg gap-1 items-center">{{ movie.vote_average.toFixed(1) }} <StarIcon class="h-5 w-5 text-yellow-500" /></span>
                    <HeartIcon @click="postLike()" :class="`h-6 w-6 ${ liked ? 'text-red-600 hover:text-red-500' : 'text-slate-100 hover:text-red-400'} cursor-pointer`" />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.movie-card {
    .movie-text {
        display: none;
        height: 0;
    }
    .movie-text-like {
        display: none;
        height: 0;
    }
    &:hover {
        .movie-text {
            display: flex;
            flex-direction: column;
            height: auto;
            transition: opacity 0.3s;
        }
        .movie-text-like {
            display: flex;
            height: auto;
            transition: opacity 0.3s;    
        }
        .text-container {
            border-radius: 10px 10px 0 0;
            padding: 12px;
        }
    }
    .text-container {
        padding: 4px 8px 4px 12px;
    }
}
</style>