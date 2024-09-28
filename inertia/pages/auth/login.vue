<script setup lang="ts">
import { router } from '@inertiajs/vue3'
import AuthLayout from '~/layouts/AuthLayout.vue'
import UtilityService from '#services/utility_service'

defineOptions({ layout: AuthLayout })
</script>

<template>
  <AppHead title="Login" description="Login to your PlotMyCourse account" />

  <div class="flex flex-col space-y-2">
    <h1 class="text-2xl font-semibold tracking-tight">Login - {{ UtilityService.someMethod() }}</h1>
    <p class="text-sm text-muted-foreground">
      <Link href="/register">Need an account? Register</Link>
    </p>
  </div>
</template>
