<script setup lang="ts">
import CourseDto from '#dtos/course'
import OrganizationDto from '#dtos/organization'
import { SimplePaginatorDtoMetaContract } from '@adocasts.com/dto/types'
import { Link, WhenVisible } from '@inertiajs/vue3'
import { EllipsisVertical, Plus } from 'lucide-vue-next'
import { computed, ref, watchEffect } from 'vue'

const props = defineProps<{
  organization: OrganizationDto
  courses: CourseDto[]
  coursesMeta: SimplePaginatorDtoMetaContract
}>()

const courses = ref(props.courses)
const actions = ref()

const hasMorePages = computed(() => {
  const { currentPage, lastPage } = props.coursesMeta
  return currentPage < lastPage
})

const whenVisibleParams = computed(() => ({
  only: ['courses', 'coursesMeta'],
  preserveUrl: true,
  data: {
    page: props.coursesMeta.currentPage + 1,
  },
}))

watchEffect(() => (courses.value = props.courses))
</script>

<template>
  <AppHead title="Courses" :description="`Manage the courses for ${organization.name}`" />

  <div class="w-full max-w-screen-xl mx-auto bg-background border rounded-xl py-4 lg:px-4">
    <div class="flex items-center justify-between mb-3">
      <h1 class="text-2xl font-bold px-4">Courses</h1>

      <Button size="sm" variant="ghost" @click="actions.create()">
        <Plus class="w-3 h-3 mr-2" />
        Add Course
      </Button>
    </div>

    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Difficulty</TableHead>
          <TableHead>Access</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody v-if="courses?.length">
        <TableRow v-for="course in courses" :key="course.id" class="group">
          <TableCell>
            <Link :href="`/courses/${course.id}`" class="hover:underline">
              {{ course.name }}
            </Link>
          </TableCell>
          <TableCell>{{ course.status?.name }}</TableCell>
          <TableCell>{{ course.difficulty?.name }}</TableCell>
          <TableCell>{{ course.accessLevel?.name }}</TableCell>
          <TableCell>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <EllipsisVertical class="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem :as="Link" :href="`/courses/${course.id}`">
                  Open
                </DropdownMenuItem>
                <DropdownMenuItem @click="actions.edit(course)">Edit</DropdownMenuItem>
                <DropdownMenuItem @click="actions.destroy(course)">Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </TableCell>
        </TableRow>
        <WhenVisible :params="whenVisibleParams" :always="hasMorePages">
          <template #fallback>
            <TableRow>
              <TableCell colspan="5"> Loading ... </TableCell>
            </TableRow>
          </template>
        </WhenVisible>
      </TableBody>
      <TableBody v-else>
        <TableRow>
          <TableCell colspan="5" class="text-center"> You don't have any courses yet. </TableCell>
        </TableRow>
      </TableBody>
    </Table>

    <CourseActions ref="actions" :organization="organization" />
  </div>
</template>
