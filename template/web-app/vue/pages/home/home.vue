<template>
    <div>Home</div>
</template>

<script setup lang="ts">
import { request, API } from '@/shared/service'

request.post(API.HOME_DATA).then(({ data }) => {
    console.log('data', data)
})
</script>

<style scoped></style>
