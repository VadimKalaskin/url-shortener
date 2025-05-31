import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateShortUrlDto } from './dto/CreateShortUrl.dto';
import * as crypto from 'node:crypto';
import { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UrlService {
	constructor(
		private prisma: PrismaService,
		private configService: ConfigService,
	) {}

	async shorten(dto: CreateShortUrlDto) {
		if (dto.alias) {
			const aliasExist = await this.prisma.url.findUnique({
				where: {
					alias: dto.alias,
				},
				select: {
					id: true,
				},
			});

			if (aliasExist) throw new ConflictException('Этот alias уже занят!');
		}

		const alias = dto.alias || this.generateAlias();

		const url = await this.prisma.url.create({
			data: {
				originalUrl: dto.originalUrl,
				alias,
				expiresAt: dto.expiresAt || null,
			},
		});

		return { shortUrl: this.configService.getOrThrow('APPLICATION_URL') + url.alias };
	}

	async get(shortUrl: string, req: Request, res: Response) {
		const url = await this.prisma.url.findUnique({
			where: {
				alias: shortUrl,
			},
			select: {
				originalUrl: true,
				id: true,
			},
		});

		if (!url) throw new NotFoundException();

		await this.prisma.click.create({
			data: {
				urlId: url.id,
				ipAddress: req.ip as string,
			},
		});

		return res.redirect(301, url.originalUrl);
	}

	async getInfo(shortUrl: string) {
		const url = await this.prisma.url.findUnique({
			where: {
				alias: shortUrl,
			},
			select: {
				originalUrl: true,
				createdAt: true,
				click: {
					select: {
						id: true,
					},
				},
			},
		});

		if (!url) throw new NotFoundException();

		return {
			originalUrl: url.originalUrl,
			createdAt: url.createdAt,
			clickCount: url.click.length,
		};
	}

	async delete(shortUrl: string) {
		const url = await this.prisma.url.findUnique({
			where: {
				alias: shortUrl,
			},
			select: {
				id: true,
			},
		});

		if (!url) throw new NotFoundException();

		return this.prisma.url.delete({
			where: {
				alias: shortUrl,
			},
		});
	}

	async getAnalytics(shortUrl: string) {
		const url = await this.prisma.url.findUnique({
			where: {
				alias: shortUrl,
			},
			select: {
				id: true,
			},
		});

		if (!url) throw new NotFoundException();

		const [clicks, total] = await Promise.all([
			this.prisma.click.findMany({
				where: { urlId: url.id },
				select: { ipAddress: true },
				orderBy: { createdAt: 'desc' },
				take: 5,
			}),
			this.prisma.click.count({ where: { urlId: url.id } }),
		]);

		return {
			clickCount: total,
			clicks,
		};
	}

	async list() {
		return this.prisma.url.findMany({});
	}

	private generateAlias(length: number = 20): string {
		const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
		let result = '';
		const randomBytes = crypto.randomBytes(length);

		for (let i = 0; i < length; i++) {
			result += chars[randomBytes[i] % chars.length];
		}

		return result;
	}

	private toBase62(buffer: Buffer): string {
		const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
		let result = '';
		let num = BigInt('0x' + buffer.toString('hex'));

		while (num > 0n) {
			result = chars[Number(num % 62n)] + result;
			num /= 62n;
		}

		return result;
	}
}
