<template>
  <div>
    <header>
      <nav class="flex items-center justify-between p-6 lg:px-8">
        <div class="flex lg:flex-1">
          <Link href="/" class="-m-1.5 p-1.5">
            <span class="sr-only">PlotMyCourse</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="h-8 w-auto"
            >
              <circle cx="6" cy="19" r="3" />
              <path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15" />
              <circle cx="18" cy="5" r="3" />
            </svg>
          </Link>
        </div>
        <div class="flex flex-1 justify-end gap-4">
          <Link href="/register" class="text-sm font-semibold leading-6 text-slate-900">
            Register
          </Link>
          <Link href="/login" class="text-sm font-semibold leading-6 text-slate-900"> Login </Link>
        </div>
      </nav>
    </header>
    <div class="p-6 lg:p-8">
      <div class="flex flex-col justify-center space-y-6 w-full sm:w-[350px] mx-auto">
        <slot />
      </div>
    </div>
  </div>
</template>
