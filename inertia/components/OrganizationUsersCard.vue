<script setup lang="ts">
import RoleDto from '#dtos/role'
import UserDto from '#dtos/user'
import { RefreshCcw } from 'lucide-vue-next'

const props = defineProps<{ users: UserDto[]; user: UserDto; roles: RoleDto[] }>()

function getRoleName(roleId: number) {
  return props.roles.find((role) => role.id === roleId)?.name
}
</script>

<template>
  <Card>
    <CardHeader>
      <div class="flex justify-between">
        <div>
          <CardTitle>Organization Members</CardTitle>
          <CardDescription>Members of your organization.</CardDescription>
        </div>
        <div>
          <Button variant="ghost" size="sm" as-child>
            <Link :only="['users']" preserve-scroll>
              <RefreshCcw class="w-3 h-3 mr-2" />
              Refresh
            </Link>
          </Button>
        </div>
      </div>
    </CardHeader>

    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead> Name </TableHead>
            <TableHead> Email </TableHead>
            <TableHead> Role </TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="member in users" :key="member.id">
            <TableCell>
              {{ member.fullName }}
              <span v-if="user.id === member.id" class="text-slate-400 italic inline-block ml-3">
                (You)
              </span>
            </TableCell>
            <TableCell>
              {{ member.email }}
            </TableCell>
            <TableCell>
              {{ getRoleName(member.meta.pivot_role_id) }}
            </TableCell>
            <TableCell>
              <Link
                :href="`/settings/organization/user/${member.id}`"
                method="delete"
                class="text-red-500"
                as="button"
                preserve-scroll
              >
                Remove
              </Link>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </CardContent>
  </Card>
</template>
