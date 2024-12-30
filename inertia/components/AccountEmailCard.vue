<script setup lang="ts">
import { useForm } from '@inertiajs/vue3'
import { Loader } from 'lucide-vue-next'

defineProps<{ email: string }>()

const form = useForm({
  email: '',
  password: '',
})
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Update Email</CardTitle>
      <CardDescription>Update your account's email address.</CardDescription>
    </CardHeader>

    <CardContent>
      <form
        id="accountEmailForm"
        class="grid gap-4"
        @submit.prevent="form.put('/settings/account/email', { onSuccess: () => form.reset() })"
      >
        <FormInput
          v-model="form.email"
          type="email"
          label="Email"
          :error="form.errors.email"
          :placeholder="email"
        />

        <FormInput
          v-model="form.password"
          label="Confirm Password"
          type="password"
          placeholder="Please confirm your password to change your email"
          :error="form.errors.password"
        />
      </form>
    </CardContent>

    <CardFooter class="border-t px-6 py-4">
      <Button form="accountEmailForm" type="submit">
        <Loader v-if="form.processing" class="mr-2 h-4 w-4 animate-spin" />
        Update Email
      </Button>
    </CardFooter>
  </Card>
</template>
