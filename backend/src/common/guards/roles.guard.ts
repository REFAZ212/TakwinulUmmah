import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { RoleName } from '@prisma/client';

/**
 * RBAC guard — reads roles set via @Roles(...) and checks against the
 * authenticated user's role (attached by JwtStrategy after JwtAuthGuard runs).
 * Always pair with JwtAuthGuard: @UseGuards(JwtAuthGuard, RolesGuard).
 */
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<RoleName[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles || requiredRoles.length === 0) return true;

    const { user } = context.switchToHttp().getRequest();
    if (!user || !requiredRoles.includes(user.role)) {
      throw new ForbiddenException('Anda tidak memiliki izin untuk mengakses sumber daya ini.');
    }
    return true;
  }
}
