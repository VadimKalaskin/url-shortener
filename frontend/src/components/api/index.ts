import type {
	ApiError,
	CreateShortUrlRequestType,
	UrlAnalyticsResponse,
	UrlType,
} from '../../types';
import type { AxiosError } from 'axios';
import axios from 'axios';

// Типизация успешного ответа
type ApiResponse<T> = {
	data: T;
	error?: never;
};

// Типизация ошибочного ответа
type ApiErrorResponse = {
	data?: never;
	error: AxiosError<ApiError>;
};

// Объединяем в один тип
type ApiResponseUnion<T> = Promise<ApiResponse<T> | ApiErrorResponse>;

export async function createShortUrl(
	dto: CreateShortUrlRequestType
): ApiResponseUnion<{ shortUrl: string }> {
	return axios
		.post('/api/shorten', dto)
		.then(res => ({ data: res.data }))
		.catch((err: AxiosError<ApiError>) => ({ error: err }));
}

export async function getUrlsList(): ApiResponseUnion<UrlType[]> {
	return axios
		.get<UrlType[]>('/api/list')
		.then(res => ({ data: res.data }))
		.catch((err: AxiosError<ApiError>) => ({ error: err }));
}

export async function deleteShortUrl(alias: string): ApiResponseUnion<{}>
{
	return axios
		.delete(`/api/delete/${alias}`)
		.then(res => ({ data: res.data }))
		.catch((err: AxiosError<ApiError>) => ({ error: err }));
}

export async function getUrlAnalytics(
	alias: string
): ApiResponseUnion<UrlAnalyticsResponse> {
	return axios
		.get<UrlAnalyticsResponse>(`/api/analytics/${alias}`)
		.then(res => ({ data: res.data }))
		.catch((err: AxiosError<ApiError>) => ({ error: err }));
}