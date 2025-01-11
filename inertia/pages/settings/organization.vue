<script setup lang="ts">
import OrganizationDto from '#dtos/organization'
import RoleDto from '#dtos/role'
import UserDto from '#dtos/user'

defineProps<{
  organization: OrganizationDto
  user: UserDto
  users: UserDto[]
  roles: RoleDto[]
}>()
</script>

<template>
  <AppHead
    title="Organization Settings"
    :description="`Manage your ${organization.name} organization`"
  />

  <SettingsShell>
    <OrganizationEditCard :organization="organization" />
    <OrganizationUsersCard :user="user" :users="users" :roles="roles" />
  </SettingsShell>
</template>
