<script setup lang="ts">
import UserDto from '#dtos/user'

const props = defineProps<{
  user: UserDto
}>()
</script>

<template>
  <div>
    <h1>AppLayout</h1>
    <div>
      <slot />
    </div>
  </div>
</template>
