<script setup lang="ts">
import UserDto from '#dtos/user'

defineProps<{ user: UserDto }>()
</script>

<template>
  <AppHead title="Account Settings" description="Manage your PlotMyCourse account" />

  <SettingsShell>
    <AccountEmailCard :email="user.email" />
    <AccountDeleteCard :email="user.email" />
  </SettingsShell>
</template>
