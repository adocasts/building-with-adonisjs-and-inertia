<script setup lang="ts">
import OrganizationDto from '#dtos/organization'
import { useForm } from '@inertiajs/vue3'
import { Loader } from 'lucide-vue-next'
import { ref, watchEffect } from 'vue'

const props = defineProps<{ organization: OrganizationDto }>()

const isDestroying = ref(false)

const form = useForm({
  name: props.organization.name,
})

watchEffect(() => {
  form
    .defaults({
      name: props.organization.name,
    })
    .reset()
})
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Update Organization</CardTitle>
      <CardDescription>Update your organization's details</CardDescription>
    </CardHeader>

    <CardContent>
      <form
        id="organizationUpdateForm"
        @submit.prevent="form.put(`/organizations/${organization.id}`, { preserveScroll: true })"
      >
        <FormInput label="Name" v-model="form.name" :error="form.errors.name" />
      </form>
    </CardContent>

    <CardFooter class="flex justify-between gap-4 border-t px-6 py-4">
      <Button type="submit" form="organizationUpdateForm" :disable="form.processing">
        <Loader v-if="form.processing" class="mr-2 h-4 w-4 animate-spin" />
        Update Organization
      </Button>

      <Button variant="destructive" @click="isDestroying = true"> Delete Organization </Button>
    </CardFooter>
  </Card>

  <ConfirmDestroyDialog
    v-model:open="isDestroying"
    title="Delete Organization?"
    :action-href="`/organizations/${organization.id}`"
  >
    Are you sure you'd like to delete your
    <strong>{{ organization.name }}</strong> organization? All data associated with this
    organization, including courses and lessons, will be deleted forever.
  </ConfirmDestroyDialog>
</template>
