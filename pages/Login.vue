<script setup lang="ts">
import { useUser } from '~/store/idkNazev';

const userStore = useUser();
const router = useRouter();

const signInPage = ref<boolean>(true);

const email = ref<string>('');
const password = ref<string>('');

async function login() {
  if(password.value.length < 5 || password.value.length > 20) {
    return;
  }

  await userStore.login(email.value, password.value);
  if(userStore.token) {
    await userStore.loadUser();
    router.push('/');
  }
}

onMounted(async () => {
  if(userStore.token){
    await userStore.loadUser();
    router.push('/');
  }
});
</script>

<template>
  <div class="w-full h-full flex justify-center">
    <div class="bg-slate-900 w-full max-w-sm h-fit p-8 mt-40 rounded-lg flex flex-col gap-6">

      <div class="flex flex-col gap-3">
        <span class="text-slate-100 text-2xl font-bold">
          {{ signInPage ? 'Sign in' : 'Create account' }}
        </span>
        <span class="text-slate-300 text-sm">
          Search for your favourite movies
        </span>
      </div>  

      <div class="flex flex-col gap-4">
        <input
          v-model="email"
          type="text"
          placeholder="Email"
          required="true"
          class="rounded-lg p-2 text-sm bg-slate-800 placeholder:text-slate-400 border border-slate-900 placeholder:font-semibold focus:outline-none text-slate-300 font-bold"
        >
        <div class="flex flex-col gap-1">
          <input
            v-model="password"
            type="password"
            placeholder="Password"
            required="true"
            class="rounded-lg p-2 text-sm bg-slate-800 placeholder:text-slate-400 border border-slate-900 placeholder:font-semibold focus:outline-none text-slate-300"
          >
          <span v-if="password.length < 5 || password.length > 20" class="text-red-600 text-xs ml-1">5-20 characters</span>
        </div>  
      </div>

      <div class="flex justify-center">
        <button @click="login" :class="`${email != '' && password !== '' && password.length >= 5 && password.length <= 20 ? 'bg-blue-800 hover:bg-blue-700' : 'bg-blue-950 cursor-not-allowed'} h-fit py-3 px-6 rounded-xl w-fit`">
          <span class="text-slate-100 font-bold">
            {{ signInPage ? 'Sign in' : 'Create account' }}
          </span>
        </button>
      </div>

      <div class="flex text-slate-200 justify-center gap-2 text-sm">
        <span>{{ signInPage ? 'New to MyMovies?' : 'Have an account?' }}</span>
        <span @click="signInPage = !signInPage" class="cursor-pointer text-blue-500 font-semibold">{{ signInPage ? 'Join now!' : 'Sign in' }}</span>
      </div>

    </div>
  </div>
</template>