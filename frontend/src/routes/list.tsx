import { useEffect, useState } from "react";
import {deleteShortUrl, getUrlAnalytics, getUrlsList} from "../components/api";
import type {UrlAnalyticsResponse, UrlType} from "../types.ts";
import {toast} from "react-toastify";

export default function UrlList() {
	const [urlList, setUrlList] = useState<UrlType[] | []>([]);
	const [urlInfo, setUrlInfo] = useState<UrlType | undefined>(undefined);

	const handleDelete = async (alias: string) => {
		const res = await deleteShortUrl(alias)
		if(res.error){
			toast.error(res.error.response?.data.message.join(', '))
		} else {
			setUrlInfo(undefined)
			setUrlList(prev => prev.filter(i => i.alias !== alias))
			toast.success('Удалено успешно!')
		}
	}

	useEffect(() => {
		const fetchData = async () => {
			const data = await getUrlsList();
			if(data.error){
				toast.error(data.error.response?.data.message.join(', '))
			} else {
				setUrlList(data.data);
			}
		};
		fetchData();
	}, []);

	if (urlList.length === 0) return <p className="text-center text-gray-500 mt-10">Нет доступных ссылок</p>;

	const InfoBlock = () => {
		const [urlData, setUrlData] = useState<UrlAnalyticsResponse | undefined>(undefined);

		useEffect(() => {
			const fetchData = async () => {
				if(!urlInfo) return null

				const data = await getUrlAnalytics(urlInfo.alias)
				if(data.error){
					toast.error(data.error.response?.data.message.join(', '))
				} else {
					setUrlData(data.data)
				}
			}
			fetchData()
		}, [urlInfo]);

		return (
			<div className={'flex flex-col gap-2'}>
				<h2>Детальная информация о ссылке {urlInfo?.alias}</h2>
				<span>Количество кликов: <b>{urlData?.clickCount}</b></span>
				{urlData?.clickCount !== 0 && (
					<>
						<span>Последние 5 IP адресов: </span>
						<ul>
							{urlData?.clicks.map((item, i) => (
								<li key={i}>{item.ipAddress}</li>
							))}
						</ul>
					</>
				)}
			</div>
		)
	}

	return (
		<main className="max-w-screen-lg mx-auto flex flex-col gap-4 py-8 px-4">
			<h1 className="text-2xl font-bold mb-4 text-center">Список сокращённых ссылок</h1>
			{urlInfo && <InfoBlock />}
			<div className="overflow-x-auto rounded-xl shadow">
				<table className="w-full text-left text-sm border border-gray-200">
					<thead className="bg-gray-100 text-gray-700 font-semibold">
					<tr>
						<th className="p-3 border-b">Оригинальная ссылка</th>
						<th className="p-3 border-b">Алиас</th>
						<th className="p-3 border-b">Дата создания</th>
						<th className="p-3 border-b">Истекает</th>
						<th className="p-3 border-b">Сокращённая ссылка</th>
						<th className="p-3 border-b"></th>
					</tr>
					</thead>
					<tbody>
					{urlList.map((url) => (
						<tr key={url.id} className="hover:bg-gray-50" onClick={() => setUrlInfo(url)}>
							<td className="p-3 border-b max-w-[200px] truncate text-blue-700">
								<a href={url.originalUrl} target="_blank" rel="noopener noreferrer">
									{url.originalUrl}
								</a>
							</td>
							<td className="p-3 border-b">{url.alias}</td>
							<td className="p-3 border-b">
								{url.createdAt ? new Date(url.createdAt).toLocaleString() : '—'}
							</td>
							<td className="p-3 border-b">
								{url.expiresAt ? new Date(url.expiresAt).toLocaleString() : '—'}
							</td>
							<td className="p-3 border-b text-blue-600 underline">
								<a href={`/${url.alias}`} target="_blank" rel="noopener noreferrer">
									{url.alias}
								</a>
							</td>
							<td className={'p-2 border-b'}>
								<button className={'border p-2 rounded-xl bg-red-400 text-white cursor-pointer hover:bg-red-500 transition'}
										onClick={() => handleDelete(url.alias)}>Удалить</button>
							</td>
						</tr>
					))}
					</tbody>
				</table>
			</div>
		</main>
	);
}
