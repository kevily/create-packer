<script setup lang="ts">
import { fetchHomeData } from '@/shared/service'

const data = fetchHomeData()
console.log('data', data)
</script>

<template>
    <div class="root">Home</div>
</template>

<style scoped>
.root {
    @apply flex items-center justify-center;
}
</style>
