<script setup lang="ts">
import type { SharedProps } from '@adonisjs/inertia/types'
import { usePage, Link, router } from '@inertiajs/vue3'

const props = defineProps<{
  stuff: string
  sharedFromRoute: boolean
  sharedFromMiddleware: string
}>()

const page = usePage<SharedProps>()

function onClick() {
  router.post(
    '/register',
    { stuff: 'here' },
    {
      preserveScroll: true,
    }
  )
}
</script>

<template>
  <div class="flex flex-col space-y-2">
    <h1 class="text-2xl font-semibold tracking-tight">Register</h1>
    <p class="text-sm text-muted-foreground">
      <Link href="/login">Have an account? Login</Link>
    </p>

    <Link as="button" method="post" href="/register" preserve-scroll> Post to /register </Link>
    <Button @click="onClick">Click Me</Button>
  </div>
</template>
