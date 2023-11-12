<script setup lang="ts">
import { CheckIcon, XMarkIcon } from '@heroicons/vue/24/outline';

const password = ref<string>('');
const confirmPassword = ref<string>('');

const changePassword = () => {
    if(password.value !== confirmPassword.value) {
        return;
    }
    if(password.value.length < 5 || password.value.length > 20) {
        return;
    }

    alert(password.value);

}
</script>
<template>
    <div class="w-full flex justify-center">
        <div class="flex flex-col w-1/5 gap-5 bg-slate-900 p-6 rounded-xl">
            <div class="flex justify-between items-center">
                <span class="text-xl font-bold">Change Password</span>
                <XMarkIcon class="h-6 w-6 cursor-pointer text-red-600" @click="$emit('close')"/>
            </div>
            <div class="flex flex-col gap-2">
                <input
                    v-model="password"
                    type="password"
                    placeholder="Password"
                    required="true"
                    :class="`${password !== confirmPassword ? 'border-red-500' : ''} rounded-lg p-2 mx-2 text-sm bg-slate-800 placeholder:text-slate-400 border border-slate-900 placeholder:font-semibold focus:outline-none text-slate-300`"
                >
                <input
                    v-model="confirmPassword"
                    type="password"
                    placeholder="Repeat password"
                    required="true"
                    :class="`${password !== confirmPassword ? 'border-red-500' : ''} rounded-lg p-2 mx-2 text-sm bg-slate-800 placeholder:text-slate-400 border border-slate-900 placeholder:font-semibold focus:outline-none text-slate-300`"
                >
                <span v-if="password !== confirmPassword" class="text-sm text-red-500 mx-3 -mt-2">
                    Not same
                </span>
            </div>
            <div class="flex justify-center">
                <div @click="changePassword" :class="`${password !== '' && confirmPassword !== '' && password.length > 4 && password.length < 21 && confirmPassword.length < 21 && confirmPassword.length > 4 ? 'cursor-pointer opacity-100' : 'opacity-40 cursor-not-allowed'} bg-green-800 flex justify-center items-center font-bold p-2 gap-2 w-fit rounded-lg`">
                    <span>Change</span>
                    <CheckIcon class="h-6 w-6" />
                </div>
            </div>
        </div>
    </div>
</template>