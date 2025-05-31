import { Module } from '@nestjs/common';
import { UrlModule } from './url/url.module';
import { CronModule } from './cron/cron.module';
import { AppController } from './app.controller';
import { UrlService } from './url/url.service';
import { PrismaService } from './prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
	imports: [UrlModule, CronModule, ScheduleModule.forRoot()],
	controllers: [AppController],
	providers: [UrlService, PrismaService, ConfigService],
})
export class AppModule {}
