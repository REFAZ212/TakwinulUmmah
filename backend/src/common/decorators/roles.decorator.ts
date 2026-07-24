import { SetMetadata } from '@nestjs/common';
import { RoleName } from '@prisma/client';

export const ROLES_KEY = 'roles';
/**
 * Restrict a controller/handler to one or more roles.
 * Usage: @Roles('SUPER_ADMIN', 'ADMIN_SMP')
 */
export const Roles = (...roles: RoleName[]) => SetMetadata(ROLES_KEY, roles);
