<script setup lang="ts">
import { fetchHomeData } from '@/shared/service'

const data = fetchHomeData()
console.log('data', data)
</script>

<template>
    <div class="root">Home</div>
</template>

<style scoped>
@reference "@/main.css";

.root {
    @apply tw:flex tw:items-center tw:justify-center;
}
</style>
