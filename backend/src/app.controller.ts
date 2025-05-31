import { Controller, Get, Param, Req, Res } from '@nestjs/common';
import { UrlService } from './url/url.service';
import { Request, Response } from 'express';

@Controller('')
export class AppController {
	constructor(private readonly urlService: UrlService) {}

	@Get('health')
	health() {
		return 'OK';
	}

	@Get(':shortUrl')
	get(@Param('shortUrl') shortUrl: string, @Req() req: Request, @Res() res: Response) {
		return this.urlService.get(shortUrl, req, res);
	}
}
