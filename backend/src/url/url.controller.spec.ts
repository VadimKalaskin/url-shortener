import { Test } from '@nestjs/testing';
import { UrlController } from './url.controller';
import { UrlService } from './url.service';
import { CreateShortUrlDto } from './dto/CreateShortUrl.dto';

describe('UrlController', () => {
	let controller: UrlController;
	let mockUrlService: Partial<Record<keyof UrlService, jest.Mock>>;

	const mockUrls = [
		{
			originalUrl: 'https://example.com',
			alias: 'abc123',
			createdAt: new Date(),
			click: [],
		},
		{
			originalUrl: 'https://google.com',
			alias: 'xyz789',
			createdAt: new Date(),
			click: [],
		},
	];

	beforeEach(async () => {
		mockUrlService = {
			shorten: jest.fn(),
			list: jest.fn(),
			getInfo: jest.fn(),
			delete: jest.fn(),
			getAnalytics: jest.fn(),
		};

		const moduleRef = await Test.createTestingModule({
			controllers: [UrlController],
			providers: [
				{
					provide: UrlService,
					useValue: mockUrlService,
				},
			],
		}).compile();

		controller = moduleRef.get<UrlController>(UrlController);
	});

	describe('shorten', () => {
		it('должен вызвать urlService.shorten с правильным DTO', async () => {
			const dto: CreateShortUrlDto = {
				originalUrl: 'https://example.com',
				alias: 'custom_alias',
				expiresAt: new Date('2025-01-01'),
			};
			const result = { shortUrl: 'http://shortener.local/custom_alias' };

			mockUrlService.shorten && mockUrlService.shorten.mockReturnValueOnce(result);

			expect(await controller.shorten(dto)).toEqual(result);
			expect(mockUrlService.shorten).toHaveBeenCalledWith(dto);
		});
	});

	describe('list', () => {
		it('должен вернуть список URL', async () => {
			mockUrlService.list && mockUrlService.list.mockReturnValueOnce(mockUrls);

			expect(await controller.list()).toEqual(mockUrls);
			expect(mockUrlService.list).toHaveBeenCalled();
		});
	});

	describe('getInfo', () => {
		it('должен вызвать urlService.getInfo с правильным alias', async () => {
			const alias = 'abc123';
			const result = {
				originalUrl: 'https://example.com',
				createdAt: new Date(),
				clickCount: 0,
			};

			mockUrlService.getInfo && mockUrlService.getInfo.mockReturnValueOnce(result);

			expect(await controller.getInfo(alias)).toEqual(result);
			expect(mockUrlService.getInfo).toHaveBeenCalledWith(alias);
		});
	});

	describe('delete', () => {
		it('должен вызвать urlService.delete с правильным alias', async () => {
			const alias = 'abc123';

			mockUrlService.delete && mockUrlService.delete.mockResolvedValueOnce(undefined);

			expect(await controller.delete(alias)).toBeUndefined();
			expect(mockUrlService.delete).toHaveBeenCalledWith(alias);
		});
	});

	describe('getAnalytics', () => {
		it('должен вызвать urlService.getAnalytics с правильным alias', async () => {
			const alias = 'abc123';
			const result = {
				clickCount: 5,
				clicks: [{ ipAddress: '127.0.0.1' }],
			};

			mockUrlService.getAnalytics && mockUrlService.getAnalytics.mockReturnValueOnce(result);

			expect(await controller.getAnalytics(alias)).toEqual(result);
			expect(mockUrlService.getAnalytics).toHaveBeenCalledWith(alias);
		});
	});
});
