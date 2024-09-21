<script lang="ts" setup>
import { Menu, Slash, Route } from 'lucide-vue-next'
</script>

<template>
  <nav class="hidden gap-5 text-sm items-center md:flex lg:gap-6">
    <Link href="/courses" class="flex items-center gap-2 text-lg font-semibold md:text-base">
      <Route class="h-6 w-6" />
      <span class="sr-only">PlotMyCourse</span>
    </Link>

    <div class="flex items-center">
      <Slash class="text-slate-300 w-4 h-4 -rotate-12" />
      <span>TODO: ORG SELECT</span>
      <Slash class="text-slate-300 w-4 h-4 -rotate-12" />
    </div>

    <Link
      href="/courses"
      class="desktop-link"
      :class="{ active: $page.url.startsWith('/courses') }"
    >
      Courses
    </Link>

    <Link
      href="/difficulties"
      class="desktop-link"
      :class="{ active: $page.url.startsWith('/difficulties') }"
    >
      Difficulties
    </Link>

    <Link
      href="/statuses"
      class="desktop-link"
      :class="{ active: $page.url.startsWith('/statuses') }"
    >
      Statuses
    </Link>

    <Link
      href="/access-levels"
      class="desktop-link"
      :class="{ active: $page.url.startsWith('/access-levels') }"
    >
      Access Levels
    </Link>
  </nav>

  <Sheet>
    <SheetTrigger as-child>
      <Button variant="outline" size="icon" class="shrink-0 md:hidden">
        <Menu class="w-5 h-5" />
        <span class="sr-only">Toggle navigation menu</span>
      </Button>
    </SheetTrigger>
    <SheetContent side="left">
      <nav class="grid gap-6 text-lg font-medium">
        <Link href="/courses" class="flex items-center gap-2 text-lg font-semibold">
          <Route class="h-6 w-6" />
          <span class="sr-only">PlotMyCourse</span>
        </Link>

        <span>TODO: ORG SELECT</span>

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

<style scope>
.desktop-link {
  @apply text-muted-foreground transition-colors hover:text-foreground;

  &.active {
    @apply text-foreground;
  }
}

.mobile-link {
  @apply text-muted-foreground hover:text-foreground;

  &.active {
    @apply text-foreground;
  }
}
</style>
