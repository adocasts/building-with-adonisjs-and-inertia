<script setup lang="ts">
import AuthLayout from '~/layouts/AuthLayout.vue'
import { useForm } from '@inertiajs/vue3'
import { Loader } from 'lucide-vue-next'
import OrganizationInviteDto from '#dtos/organization_invite'

defineOptions({ layout: AuthLayout })

const props = defineProps<{
  invite?: OrganizationInviteDto
}>()

const form = useForm({
  fullName: '',
  email: props.invite?.email ?? '',
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

  <form
    class="grid gap-3"
    @submit.prevent="form.post('/register', { onSuccess: () => form.reset() })"
  >
    <FormInput
      label="Full Name"
      v-model="form.fullName"
      :error="form.errors.fullName"
      :disabled="form.processing"
    />

    <div class="grid gap-1">
      <Label class="grid gap-1">
        <span>Email</span>
        <Input type="email" v-model="form.email" :disabled="!!invite" />
      </Label>
      <div v-if="form.errors.email" class="text-red-500 text-sm">
        {{ form.errors.email }}
      </div>
    </div>

    <div class="grid gap-1">
      <Label class="grid gap-1">
        <span>Password</span>
        <Input type="password" v-model="form.password" />
      </Label>
      <div v-if="form.errors.password" class="text-red-500 text-sm">
        {{ form.errors.password }}
      </div>
    </div>

    <Button type="submit" :disabled="form.processing">
      <Loader v-if="form.processing" class="mr-2 h-4 w-4 animate-spin" />
      Register
    </Button>
  </form>
</template>
