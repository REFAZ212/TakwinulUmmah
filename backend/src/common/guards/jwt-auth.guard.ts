import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * Verifies the JWT access token. Applied to every /api/admin/* route.
 * Public routes (/api/public/*) never use this guard.
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
