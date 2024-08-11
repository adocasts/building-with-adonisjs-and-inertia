<script setup lang="ts">
import { Link } from '@inertiajs/vue3'
</script>

<template>
  <div class="flex flex-col space-y-2">
    <h1 class="text-2xl font-semibold tracking-tight">Login</h1>
    <p class="text-sm text-muted-foreground">
      <Link href="/register">Need an account? Register</Link>
    </p>
  </div>
</template>
