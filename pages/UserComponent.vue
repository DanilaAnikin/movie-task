<script setup lang="ts">
import { HomeIcon, EyeIcon } from '@heroicons/vue/24/outline';
import { definePageMeta } from 'nuxt/dist/pages/runtime';
import { useUser } from '../store/idkNazev';
import { onMounted, ref } from 'vue';

const userStore = useUser();

const emit = defineEmits(['go-main']);

const user = ref<{id: number, email: string} | null>(null);

const changeOpened = ref<boolean>(false);

onMounted(async() => {
    if(userStore.token){
        await userStore.loadUser();
        user.value = userStore.user;
    }
})
</script>

<template>
    <div :class="`${changeOpened ? 'opacity-30' : ''}`">
        <div class="w-full pt-10 flex justify-between px-10">
            <span class="text-3xl font-bold">
                Me
            </span>
            <HomeIcon class="h-10 w-10 text-slate-200 cursor-pointer" @click="$emit('go-main')" />
        </div>
        <div class="w-full flex justify-center mt-40 flex-col items-center gap-4">
            <span class="text-xl">
                Email: {{ user?.email }}
            </span>
            <span class="text-xl flex items-center gap-2">
                Password: <EyeIcon class="h-6 w-6" />
            </span>
            <span @click="changeOpened = true" class="text-red-500 font-bold text-sm cursor-pointer">
                Change password
            </span>
        </div>
    </div>
    <ChangePassword v-if="changeOpened" @close="changeOpened=false" />
</template>