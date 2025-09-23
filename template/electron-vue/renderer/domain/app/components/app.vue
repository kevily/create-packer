<template>
    <router-view />
</template>

<script setup lang="ts">
import { router, routerNames } from '@/renderer/domain/router'

router.beforeEach(async to => {
    if (!Object.values(routerNames).includes(to.name as string)) {
        return {
            replace: true,
            name: routerNames.notFound
        }
    }
})
</script>

<style scoped></style>
