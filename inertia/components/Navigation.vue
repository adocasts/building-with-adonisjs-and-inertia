<script lang="ts" setup>
import { Abilities } from '#actions/abilities/get_abilities'
import OrganizationDto from '#dtos/organization'
import { router } from '@inertiajs/vue3'
import { Menu, Slash, Route } from 'lucide-vue-next'
import { onMounted } from 'vue'

const props = defineProps<{
  organization: OrganizationDto
  organizations: OrganizationDto[]
  can: Abilities
}>()

onMounted(() => {
  router.prefetch('/access-levels', { method: 'get' }, { cacheFor: '5s' })
})
</script>

<template>
  <nav class="hidden md:flex items-center gap-5 lg:gap-6 text-sm">
    <Link href="/courses" class="flex items-center gap-2 font-semibold md:text-base text-lg">
      <Route class="w-6 h-6" />
      <span class="sr-only">PlotMyCourse</span>
    </Link>

    <div class="flex items-center">
      <Slash class="w-4 h-4 text-slate-300 -rotate-12" />
      <OrganizationSelect v-bind="props" :can="can" />
      <Slash class="w-4 h-4 text-slate-300 -rotate-12" />
    </div>

    <Link
      href="/courses"
      class="desktop-link"
      :class="{ active: $page.url.startsWith('/courses') }"
      prefetch
      :cache-for="['5s', '1m']"
    >
      Courses
    </Link>

    <Link
      href="/difficulties"
      class="desktop-link"
      :class="{ active: $page.url.startsWith('/difficulties') }"
      :prefetch="['click', 'mount']"
      cache-for="5s"
    >
      Difficulties
    </Link>

    <Link
      href="/statuses"
      class="desktop-link"
      :class="{ active: $page.url.startsWith('/statuses') }"
      prefetch="mount"
    >
      Statuses
    </Link>

    <Link
      href="/access-levels"
      class="desktop-link"
      :class="{ active: $page.url.startsWith('/access-levels') }"
      prefetch
    >
      Access Levels
    </Link>
  </nav>

  <Sheet>
    <SheetTrigger as-child>
      <Button variant="outline" size="icon" class="md:hidden shrink-0">
        <Menu class="w-5 h-5" />
        <span class="sr-only">Toggle navigation menu</span>
      </Button>
    </SheetTrigger>
    <SheetContent side="left">
      <nav class="gap-6 grid font-medium text-lg">
        <Link href="/courses" class="flex items-center gap-2 font-semibold text-lg">
          <Route class="w-6 h-6" />
          <span class="sr-only">PlotMyCourse</span>
        </Link>

        <OrganizationSelect v-bind="props" :can="can" />

        <Link
          href="/courses"
          class="mobile-link"
          :class="{ active: $page.url.startsWith('/courses') }"
        >
          Courses
        </Link>

        <Link
          href="/difficulties"
          class="mobile-link"
          :class="{ active: $page.url.startsWith('/difficulties') }"
        >
          Difficulties
        </Link>

        <Link
          href="/statuses"
          class="mobile-link"
          :class="{ active: $page.url.startsWith('/statuses') }"
        >
          Statuses
        </Link>

        <Link
          href="/access-levels"
          class="mobile-link"
          :class="{ active: $page.url.startsWith('/access-levels') }"
        >
          Access Levels
        </Link>
      </nav>
    </SheetContent>
  </Sheet>
</template>
