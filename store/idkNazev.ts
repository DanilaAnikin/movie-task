import {defineStore} from 'pinia';

export const useUser = defineStore('checkUser', () => {
    const user = ref<{id: number, email: string} | null>(null);
    const token = useCookie('token', {maxAge: 60 * 60 * 24 * 30});

    async function loadUser(){
        const userData = await $fetch('/api/auth/user', {
            headers: {
                Authorization: 'Bearer ' + token.value
            }
        });
        user.value = userData;
    }


    async function login(email: string, password: string) {
        const data = await $fetch('/api/auth/login', {
            method: 'POST',
            body: {
              email,
              password,
            }
        });

        token.value = data;

        await loadUser();
    }

    return {
        loadUser,
        user,
        token,
        login
    }
})