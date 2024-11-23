<script setup lang="ts">
import CourseDto from '#dtos/course';
import OrganizationDto from '#dtos/organization';
import { Pencil, Trash2 } from 'lucide-vue-next';
import { ref, watchEffect } from 'vue';

const props = defineProps<{
  organization: OrganizationDto
  course: CourseDto
}>()

const internalCourse = ref({ ...props.course })
const actions = ref()

watchEffect(() => (internalCourse.value = { ...props.course }))
</script>

<template>
  <AppHead :title="course.name" :description="`Manage your course ${course.name}`" />

  <div class="w-full max-w-screen-lg mx-auto bg-background border rounded-xl py-4 lg:px-4">
    <div class="flex flex-wrap items-center justify-between mb-6">
      <h1 class="text-2xl font-bold px-4">{{ course.name }}</h1>

      <div class="flex items-center justify-end gap-2">
        <Button size="sm" variant="ghost" @click="actions.edit(internalCourse)">
          <Pencil class="w-3 h-3 mr-2" />
          Edit
        </Button>

        <Button size="sm" variant="ghost" class="hover:text-red-500" @click="actions.destroy(internalCourse)">
          <Trash2 class="w-3 h-3 mr-2" />
          Delete
        </Button>
      </div>
    </div>

    <CourseActions ref="actions" :organization="organization" />
  </div>
</template>