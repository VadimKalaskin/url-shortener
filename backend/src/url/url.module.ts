import { Module } from '@nestjs/common';
import { UrlService } from './url.service';
import { UrlController } from './url.controller';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';

@Module({
	controllers: [UrlController],
	providers: [UrlService, PrismaService, ConfigService],
	exports: [UrlService],
})
export class UrlModule {}
