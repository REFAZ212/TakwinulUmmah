import { Module } from '@nestjs/common';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { NewsModule } from './modules/news/news.module';
import { AdmissionsModule } from './modules/admissions/admissions.module';
import { AnnouncementsModule } from './modules/announcements/announcements.module';
import { AchievementsModule } from './modules/achievements/achievements.module';
import { GalleryModule } from './modules/gallery/gallery.module';
import { FacilitiesModule } from './modules/facilities/facilities.module';
import { DownloadsModule } from './modules/downloads/downloads.module';
import { ContactModule } from './modules/contact/contact.module';
import { SettingsModule } from './modules/settings/settings.module';
import { UsersModule } from './modules/users/users.module';
import { MediaModule } from './modules/media/media.module';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      { ttl: Number(process.env.THROTTLE_TTL ?? 60) * 1000, limit: Number(process.env.THROTTLE_LIMIT ?? 100) },
    ]),
    PrismaModule,
    AuthModule,
    NewsModule,
    AdmissionsModule,
    AnnouncementsModule,
    AchievementsModule,
    GalleryModule,
    FacilitiesModule,
    DownloadsModule,
    ContactModule,
    SettingsModule,
    UsersModule,
    MediaModule,
  ],
  providers: [{ provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule {}
