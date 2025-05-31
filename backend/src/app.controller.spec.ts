import { Test } from '@nestjs/testing';
import { AppController } from './app.controller';
import { UrlService } from './url/url.service';
import { Request, Response } from 'express';

describe('AppController', () => {
	let controller: AppController;
	let mockUrlService: Partial<Record<keyof UrlService, jest.Mock>>;

	beforeEach(async () => {
		mockUrlService = {
			get: jest.fn(),
		};

		const moduleRef = await Test.createTestingModule({
			controllers: [AppController],
			providers: [
				{
					provide: UrlService,
					useValue: mockUrlService,
				},
			],
		}).compile();

		controller = moduleRef.get<AppController>(AppController);
	});

	describe('health', () => {
		it('должен возвращать "OK"', () => {
			expect(controller.health()).toBe('OK');
		});
	});

	describe('get', () => {
		const mockRequest = {} as Request;
		const mockResponse = {
			redirect: jest.fn(),
		} as unknown as Response;

		it('должен вызвать urlService.get с правильными аргументами', async () => {
			const shortUrl = 'abc123';

			await controller.get(shortUrl, mockRequest, mockResponse);

			expect(mockUrlService.get).toHaveBeenCalledWith(shortUrl, mockRequest, mockResponse);
		});

		it('не должен вызывать res.redirect напрямую из контроллера', async () => {
			const shortUrl = 'xyz789';

			await controller.get(shortUrl, mockRequest, mockResponse);

			expect(mockResponse.redirect).not.toHaveBeenCalled();
		});
	});
});
