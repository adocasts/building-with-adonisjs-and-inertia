<script setup lang="ts">
import { Head } from '@inertiajs/vue3'

defineProps<{
  title: string
  description: string
}>()
</script>

<template>
  <Head>
    <title>{{ title }}</title>
    <meta name="description" :content="description" />
  </Head>
</template>
