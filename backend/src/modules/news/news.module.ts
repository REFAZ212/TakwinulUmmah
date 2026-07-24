import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsPublicController, NewsAdminController } from './news.controller';

@Module({
  controllers: [NewsPublicController, NewsAdminController],
  providers: [NewsService],
})
export class NewsModule {}
