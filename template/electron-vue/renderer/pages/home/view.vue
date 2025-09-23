<script setup lang="ts">
import { fetchHomeData } from '@/renderer/shared/service'

const data = fetchHomeData()
console.log('data', data)
</script>

<template>
    <div class="tw:flex tw:justify-center tw:align-middle">Home</div>
</template>

<style scoped></style>
