import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class CronService {
	constructor(private prisma: PrismaService) {}

	@Cron('*/1 * * * *')
	async deleteExpiredUrls() {
		const res = await this.prisma.url.deleteMany({
			where: {
				expiresAt: {
					lte: new Date(),
				},
			},
		});
		res.count > 0 && console.log(`Удалено ${res.count} ссылок.`);
	}
}
