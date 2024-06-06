<script setup lang="ts">
import { Genre } from '~/types/genre';
import { Movie } from '~/types/movie';
import { HeartIcon, StarIcon, ArrowRightCircleIcon } from '@heroicons/vue/24/solid';
import { useUser } from '~/store/idkNazev';

const userStore = useUser();
const router = useRouter();

const props = defineProps<{
    movie: Movie,
    genres: Genre[],
    likes: number
}>();


const emit = defineEmits<{
    'post-like': [value: boolean]
}>();

let genreNames = reactive<string[]>(props.movie.genre_ids.map((genre_id) => props.genres.find(({id}) => id === genre_id)!.name));

onMounted(async() => {
    if(userStore.token){
        await userStore.loadUser();
    } else {
        router.push('/Login');
    }
});
</script>

<template>
    <div class="rounded-lg mb-4 max-w-xs">
        <div class="relative overflow-hidden movie-card">
            <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" class="rounded-l-lg rounded-r-sm border-2 border-slate-700" />
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
                <span class="movie-text text-xs">{{ movie.genre_ids.length > 1 ? 'Genres: ' : movie.genre_ids.length == 0 ? '' : 'Genre: ' }} {{ genreNames.join(', ') }}</span>
                <span class="movie-text text-xs flex flex-wrap mt-2">{{ movie.overview }}</span>
                <div class="movie-text-like justify-between mt-2 w-full">
                    <span v-if="movie.vote_average != 0" class="flex font-bold text-lg gap-1 items-center">{{ movie.vote_average.toFixed(1) }} <StarIcon :class="`h-5 w-5 ${ parseInt(movie.vote_average.toFixed(1), 10) >= 7 ? 'text-yellow-500' : parseInt(movie.vote_average.toFixed(1), 10) >= 6 ? 'text-slate-400' : 'text-yellow-800'}`" /></span>
                    <div class="flex gap-1 items-center">
                        <span class="text-sm font-bold">{{ likes }}</span>
                        <HeartIcon @click="emit('post-like', !movie.liked)" :class="`h-6 w-6 ${ movie.liked ? 'text-red-600 hover:text-red-500' : 'text-slate-100 hover:text-red-400'} cursor-pointer`" />
                    </div>
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