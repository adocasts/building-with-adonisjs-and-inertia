<script setup lang="ts">
import UserDto from '#dtos/user'
import { useForm } from '@inertiajs/vue3'
import { Loader } from 'lucide-vue-next'

const props = defineProps<{ user: UserDto }>()
const form = useForm({
  fullName: props.user.fullName,
})

const formConfig = {
  preserveScroll: true,
  onSuccess: () => {
    form.defaults({
      fullName: props.user.fullName,
    })
    form.reset()
  },
}
</script>

<template>
  <AppHead title="Profile Settings" description="Manage your PlotMycourse profile" />

  <SettingsShell>
    <Card>
      <CardHeader>
        <CardTitle>Update Profile</CardTitle>
        <CardDescription>Update your profile.</CardDescription>
      </CardHeader>

      <CardContent>
        <form id="profileForm" @submit.prevent="form.put('/settings/profile', formConfig)">
          <FormInput v-model="form.fullName" label="Full Name" :error="form.errors.fullName" />
        </form>
      </CardContent>

      <CardFooter class="border-t px-6 py-4">
        <Button type="submit" form="profileForm">
          <Loader v-if="form.processing" class="mr-2 h-4 w-4 animate-spin" />
          Update Profile
        </Button>
      </CardFooter>
    </Card>
  </SettingsShell>
</template>
