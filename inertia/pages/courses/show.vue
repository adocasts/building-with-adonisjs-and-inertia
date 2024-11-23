<script setup lang="ts">
import CourseDto from '#dtos/course';
import OrganizationDto from '#dtos/organization';
import { Pencil, Trash2 } from 'lucide-vue-next';
import { computed, ref, watchEffect } from 'vue';

const props = defineProps<{
  organization: OrganizationDto
  course: CourseDto
}>()

const internalCourse = ref({ ...props.course })
const actions = ref()
const path = computed(() => `/courses/${props.course.id}/tags`)

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
    
    <ul class="grid gap-4 mb-6 px-4">
      <li class="flex items-center gap-3">
        <div class="w-24">Status</div>
        <TagSelector
          v-model="internalCourse.statusId" 
          :options="organization.statuses" 
          :patch="{ path, key: 'statusId' }"
        />
      </li>

      <li class="flex items-center gap-3">
        <div class="w-24">Difficulty</div>
        <TagSelector
          v-model="internalCourse.difficultyId" 
          :options="organization.difficulties" 
          :patch="{ path, key: 'difficultyId' }"
        />
      </li>

      <li class="flex items-center gap-3">
        <div class="w-24">Access</div>
        <TagSelector
          v-model="internalCourse.accessLevelId" 
          :options="organization.accessLevels" 
          :patch="{ path, key: 'accessLevelId' }"
        />
      </li>
    </ul>

    <CourseActions ref="actions" :organization="organization" />
  </div>
</template>