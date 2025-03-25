<script setup lang="ts"></script>

<template>
  <main class="flex flex-col flex-1 gap-4 md:gap-8 p-4 min-h-[calc(100vh_-_theme(spacing.16))]">
    <div class="mx-auto w-full max-w-6xl">
      <h1 class="font-semibold text-3xl">Settings</h1>
    </div>

    <div
      class="items-start gap-6 grid md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr] mx-auto w-full max-w-6xl"
    >
      <nav class="grid -mx-2 text-muted-foreground text-sm">
        <Link
          href="/settings/profile"
          class="settings-link"
          :class="{ active: $page.component === 'settings/profile' }"
        >
          Profile
        </Link>

        <Link
          href="/settings/account"
          class="settings-link"
          :class="{ active: $page.component === 'settings/account' }"
        >
          Account
        </Link>

        <Link
          href="/settings/organization"
          class="settings-link"
          :class="{ active: $page.component === 'settings/organization' }"
        >
          Organization
        </Link>
      </nav>

      <div class="gap-6 grid">
        <slot />
      </div>
    </div>
  </main>
</template>
