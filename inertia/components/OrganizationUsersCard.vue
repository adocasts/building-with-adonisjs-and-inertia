<script setup lang="ts">
import RoleDto from '#dtos/role'
import UserDto from '#dtos/user'

const props = defineProps<{ users: UserDto[]; user: UserDto; roles: RoleDto[] }>()

function getRoleName(roleId: number) {
  return props.roles.find((role) => role.id === roleId)?.name
}
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Organization Members</CardTitle>
      <CardDescription>Members of your organization.</CardDescription>
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
