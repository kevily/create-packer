<script setup lang="ts">
import { watch } from 'vue'
import { useHomeQuery } from '@/shared/service'

const { data } = useHomeQuery()

watch(data, data => {
    console.log('data', data?.data)
})
</script>

<template>
    <div>Home</div>
</template>

<style scoped></style>
