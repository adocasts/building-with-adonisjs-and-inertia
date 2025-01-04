<script setup lang="ts">
import OrganizationDto from '#dtos/organization'

defineProps<{
  organization: OrganizationDto
}>()
</script>

<template>
  <AppHead
    title="Organization Settings"
    :description="`Manage your ${organization.name} organization`"
  />

  <SettingsShell>
    <OrganizationEditCard :organization="organization" />
  </SettingsShell>
</template>
