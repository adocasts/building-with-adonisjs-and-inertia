<script setup lang="ts">
import { Abilities } from '#actions/abilities/get_abilities'
import OrganizationDto from '#dtos/organization'
import OrganizationInviteDto from '#dtos/organization_invite'
import RoleDto from '#dtos/role'
import UserDto from '#dtos/user'
// import { usePoll } from '@inertiajs/vue3'

defineProps<{
  organization: OrganizationDto
  user: UserDto
  users: UserDto[]
  roles: RoleDto[]
  invites: OrganizationInviteDto[]
  can: Abilities
}>()

// usePoll(5_000, {
//   only: ['users', 'invites'],
// })
</script>

<template>
  <AppHead
    title="Organization Settings"
    :description="`Manage your ${organization.name} organization`"
  />

  <SettingsShell>
    <OrganizationEditCard v-if="can.organization.edit" :organization="organization" />
    <OrganizationUsersCard :user="user" :users="users" :roles="roles" :can="can" />
    <OrganizationUserInvitesCard :invites="invites" :roles="roles" :can="can" />
  </SettingsShell>
</template>
