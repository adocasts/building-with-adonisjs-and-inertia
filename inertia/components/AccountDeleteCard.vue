<script setup lang="ts">
import { useForm } from '@inertiajs/vue3'

defineProps<{ email: string }>()

const form = useForm({
  email: '',
})
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Delete Account</CardTitle>
      <CardDescription>Delete your account and all your data.</CardDescription>
    </CardHeader>

    <CardContent>
      <form
        id="accountDeleteForm"
        class="grid gap-4"
        @submit.prevent="form.delete('/settings/account')"
      >
        <FormInput
          v-model="form.email"
          type="email"
          label="Please enter your account email to confirm deletion"
          :error="form.errors.email"
          :placeholder="email"
        />
      </form>
    </CardContent>

    <CardFooter class="border-t px-6 py-4">
      <Button form="accountDeleteForm" variant="destructive" type="submit">
        <Loader v-if="form.processing" class="mr-2 h-4 w-4 animate-spin" />
        Delete Account
      </Button>
    </CardFooter>
  </Card>
</template>
