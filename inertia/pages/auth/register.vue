<script setup lang="ts">
import AuthLayout from '~/layouts/AuthLayout.vue'
import { ref } from 'vue'
import { router } from '@inertiajs/vue3'

defineOptions({ layout: AuthLayout })

defineProps<{
  errors: Record<string, string[]>
}>()

const form = ref({
  fullName: '',
  email: '',
  password: '',
})
</script>

<template>
  <AppHead
    title="Register"
    description="Start plotting and planning your courses with ease by creating your PlotMyCourse account today"
  />

  <div class="flex flex-col space-y-2">
    <h1 class="text-2xl font-semibold tracking-tight">Register</h1>
    <p class="text-sm text-muted-foreground">
      <Link href="/login">Have an account? Login</Link>
    </p>
  </div>

  <form class="grid gap-3" @submit.prevent="router.post('/register', form)">
    <div class="grid gap-1">
      <Label class="grid gap-1">
        <span>Full Name</span>
        <Input type="text" v-model="form.fullName" />
      </Label>
      <div v-if="errors.fullName" class="text-red-500 text-sm">
        {{ errors.fullName.join(', ') }}
      </div>
    </div>

    <div class="grid gap-1">
      <Label class="grid gap-1">
        <span>Email</span>
        <Input type="email" v-model="form.email" />
      </Label>
      <div v-if="errors.email" class="text-red-500 text-sm">
        {{ errors.email.join(', ') }}
      </div>
    </div>

    <div class="grid gap-1">
      <Label class="grid gap-1">
        <span>Password</span>
        <Input type="password" v-model="form.password" />
      </Label>
      <div v-if="errors.password" class="text-red-500 text-sm">
        {{ errors.password.join(', ') }}
      </div>
    </div>

    <Button type="submit"> Register </Button>
  </form>
</template>
