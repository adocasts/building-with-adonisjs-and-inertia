<script setup lang="ts">
import { router } from '@inertiajs/vue3'

defineProps<{
  renderCount: number
  refreshCount1: number
  refreshCount2: number
  lazyCount: number
}>()
</script>

<template>
  <div class="flex flex-col justify-center space-y-6 w-full sm:w-[350px] mx-auto">
    <div class="flex flex-col space-y-2">
      <h1 class="text-2xl font-semibold tracking-tight">Login</h1>
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
  </div>
</template>
