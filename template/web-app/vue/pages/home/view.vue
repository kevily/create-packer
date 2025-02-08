<script setup lang="ts">
import { fetchHomeData } from '@/shared/service'

const data = fetchHomeData()
console.log('data', data)
</script>

<template>
    <div>Home</div>
</template>

<style scoped></style>
