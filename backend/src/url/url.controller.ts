import { Body, Controller, Delete, Get, Param, Post, Req, Res } from '@nestjs/common';
import { UrlService } from './url.service';
import { CreateShortUrlDto } from './dto/CreateShortUrl.dto';

@Controller('api')
export class UrlController {
	constructor(private readonly urlService: UrlService) {}

	@Post('shorten')
	shorten(@Body() dto: CreateShortUrlDto) {
		return this.urlService.shorten(dto);
	}

	@Get('list')
	list() {
		return this.urlService.list();
	}

	@Get('info/:shortUrl')
	getInfo(@Param('shortUrl') shortUrl: string) {
		return this.urlService.getInfo(shortUrl);
	}

	@Delete('delete/:shortUrl')
	delete(@Param('shortUrl') shortUrl: string) {
		return this.urlService.delete(shortUrl);
	}

	@Get('analytics/:shortUrl')
	getAnalytics(@Param('shortUrl') shortUrl: string) {
		return this.urlService.getAnalytics(shortUrl);
	}
}
