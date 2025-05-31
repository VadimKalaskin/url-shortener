

export type CreateShortUrlRequestType = {
	originalUrl: string;
	alias: string|undefined;
	expiresAt: string|undefined;
}

export type UrlType = {
	id: string;
	originalUrl: string;
	alias: string;
	expiresAt: string|undefined;
	createdAt: string|undefined;
}

export type ApiError = {
	error: boolean;
	message: string[];
	statusCode: number;
}

export type ScreenType = 'index' | 'list' | 'info';

export type Click = {
	ipAddress: string;
}

export type UrlAnalyticsResponse = {
	clickCount: number;
	clicks: Array<Click> | [];
}
