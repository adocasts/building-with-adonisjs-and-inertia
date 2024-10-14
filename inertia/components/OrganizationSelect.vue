<script setup lang="ts">
import OrganizationDto from '#dtos/organization'
import { ChevronsUpDown } from 'lucide-vue-next'
import { ref } from 'vue'

const props = defineProps<{
  organization: OrganizationDto
  organizations: OrganizationDto[]
}>()

const organizationId = ref(props.organization.id.toString())
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost">
        {{ organization.name }}
        <ChevronsUpDown class="w-4 h-4 ml-2" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuLabel> Your Organizations ({{ organizations.length }}) </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuRadioGroup v-model="organizationId">
        <DropdownMenuRadioItem
          v-for="org in organizations"
          :key="org.id"
          :value="org.id.toString()"
        >
          {{ org.name }}
        </DropdownMenuRadioItem>
      </DropdownMenuRadioGroup>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
