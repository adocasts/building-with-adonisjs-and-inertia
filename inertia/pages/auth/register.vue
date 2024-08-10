<script setup lang="ts">
import type { SharedProps } from '@adonisjs/inertia/types'

defineProps<{ stuff: string } & SharedProps>()
</script>

<template>
  <h1>Register, {{ stuff }}</h1>
</template>
