<script setup lang="ts">
const logged = ref<boolean>(true);
</script>

<template>
  <div class="text-slate-100 h-full w-full">
    <NuxtPage/>
    <!-- <index v-if="logged" @not-logged="logged = false" /> -->
    <!-- <Login v-else @logged-successfully="logged = true" /> -->
  </div>
</template>
