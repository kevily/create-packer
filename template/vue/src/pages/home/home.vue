<template>
    <div>Home</div>
</template>

<script setup lang="ts">
import { request } from '@/providers'
import { API } from './providers'

request.post(API.HOME_DATA).then(({ data }) => {
    console.log('data', data)
})
</script>

<style scoped></style>
