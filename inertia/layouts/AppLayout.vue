<script setup lang="ts">
import { Abilities } from '#actions/abilities/get_abilities'
import OrganizationDto from '#dtos/organization'
import UserDto from '#dtos/user'
import { Link } from '@inertiajs/vue3'
import { UserCircle } from 'lucide-vue-next'
import { onMounted, onUnmounted } from 'vue'

const props = defineProps<{
  organization: OrganizationDto
  organizations: OrganizationDto[]
  user: UserDto
  messages: Record<string, string | Record<string, string>>
  can: Abilities
}>()

onMounted(() => window.addEventListener('focus', onFocus))
onUnmounted(() => window.removeEventListener('focus', onFocus))

function onFocus() {
  fetch(`/organizations/${props.organization.id}`)
}
</script>

<template>
  <div class="flex min-h-screen w-full flex-col">
    <header
      class="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6"
    >
      <Navigation v-bind="props" :can="can" />

      <!-- User Panel -->
      <div class="flex flex-1 items-center justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button variant="secondary" size="icon" class="rounded-full">
              <UserCircle class="w-5 h-5" />
              <span class="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{{ user.fullName }}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem :as="Link" href="/settings/profile">
              Profile Settings
            </DropdownMenuItem>
            <DropdownMenuItem :as="Link" href="/settings/account">
              Account Settings
            </DropdownMenuItem>
            <DropdownMenuItem :as="Link" href="/settings/organization">
              Organization Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem :as="Link" href="/logout" method="post"> Logout </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>

    <main
      class="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10"
    >
      <slot />
    </main>

    <ToastManager :messages="messages" />
  </div>
</template>
