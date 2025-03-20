<script setup lang="ts">
import { useForm } from '@inertiajs/vue3'
import { AlertCircle, Loader } from 'lucide-vue-next'
import AuthLayout from '~/layouts/AuthLayout.vue'

defineOptions({ layout: AuthLayout })

defineProps<{
  errors?: Record<string, string>
}>()

const form = useForm({
  email: '',
  password: '',
  remember: false,
})
</script>

<template>
  <AppHead title="Login" description="Login to your PlotMyCourse account" />

  <div class="flex flex-col space-y-2">
    <h1 class="text-2xl font-semibold tracking-tight">Login</h1>
    <p class="text-sm text-muted-foreground">
      <Link href="/register">Need an account? Register</Link>
    </p>
  </div>

  <form @submit.prevent="form.post('/login')">
    <Alert v-if="errors?.E_INVALID_CREDENTIALS" variant="destructive" class="mb-6">
      <AlertCircle class="w-4 h-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>{{ errors?.E_INVALID_CREDENTIALS }}</AlertDescription>
    </Alert>

    <div class="grid gap-3">
      <FormInput label="Email" type="email" v-model="form.email" :error="form.errors.email" />

      <FormInput
        label="Password"
        type="password"
        v-model="form.password"
        :error="form.errors.password"
      />

      <div class="flex items-center justify-between flex-wrap gap-4">
        <FormInput type="group" :error="form.errors.remember">
          <div class="flex items-center gap-2">
            <Checkbox v-model:checked="form.remember" />
            <span>Remember me</span>
          </div>
        </FormInput>

        <Link href="/forgot-password" class="text-sm underline">Forgot Password</Link>
      </div>

      <Button type="submit" :disable="form.processing">
        <Loader v-if="form.processing" class="mr-2 h-4 w-4 animate-spin" />
        Login
      </Button>
    </div>
  </form>
</template>
