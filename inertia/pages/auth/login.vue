<script setup lang="ts">
import { router } from '@inertiajs/vue3'
import AuthLayout from '~/layouts/AuthLayout.vue'
import UtilityService from '#services/utility_service'

defineOptions({ layout: AuthLayout })

defineProps<{
  renderCount: number
  refreshCount1: number
  refreshCount2: number
  lazyCount: number
}>()
</script>

<template>
  <AppHead title="Login" description="Login to your PlotMyCourse account" />

  <div class="flex flex-col space-y-2">
    <h1 class="text-2xl font-semibold tracking-tight">Login - {{ UtilityService.someMethod() }}</h1>
    <p class="text-sm text-muted-foreground">
      <Link href="/register">Need an account? Register</Link>
    </p>
  </div>

  <Button @click="router.reload()"> Render Count: {{ renderCount }} </Button>

  <Button as-child>
    <Link href="/login" :only="['refreshCount1']"> Refresh Count 1: {{ refreshCount1 }} </Link>
  </Button>

  <Button as-child>
    <Link href="/login" :only="['refreshCount2']"> Refresh Count 2: {{ refreshCount2 }} </Link>
  </Button>

  <Button as-child>
    <Link href="/login" :only="['lazyCount']"> Lazy Count: {{ lazyCount }} </Link>
  </Button>
</template>
