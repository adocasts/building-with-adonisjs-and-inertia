import { BaseModelDto } from '@adocasts.com/dto/base'
import OrganizationInvite from '#models/organization_invite'
import UserDto from '#dtos/user'
import OrganizationDto from './organization.js'

export default class OrganizationInviteDto extends BaseModelDto {
  declare id: number
  declare invitedByUserId: number
  declare canceledByUserId: number | null
  declare roleId: number
  declare email: string
  declare acceptedAt: string | null
  declare canceledAt: string | null
  declare createdAt: string
  declare updatedAt: string
  declare invitedByUser: UserDto | null
  declare canceledByUser: UserDto | null

  declare organizationId: number
  declare organization: OrganizationDto | null

  constructor(organizationInvite?: OrganizationInvite) {
    super()

    if (!organizationInvite) return
    this.id = organizationInvite.id
    this.invitedByUserId = organizationInvite.invitedByUserId
    this.canceledByUserId = organizationInvite.canceledByUserId
    this.roleId = organizationInvite.roleId
    this.email = organizationInvite.email
    this.acceptedAt = organizationInvite.acceptedAt?.toISO()!
    this.canceledAt = organizationInvite.canceledAt?.toISO()!
    this.createdAt = organizationInvite.createdAt.toISO()!
    this.updatedAt = organizationInvite.updatedAt.toISO()!
    this.invitedByUser =
      organizationInvite.invitedByUser && new UserDto(organizationInvite.invitedByUser)
    this.canceledByUser =
      organizationInvite.canceledByUser && new UserDto(organizationInvite.canceledByUser)

    this.organizationId = organizationInvite.organizationId
    this.organization =
      organizationInvite.organization && new OrganizationDto(organizationInvite.organization)
  }
}
