import { useState } from 'react';
import { createShortUrl } from '../api';
import { toast } from 'react-toastify';

export const AddUrlForm = () => {
	const [originalUrl, setOriginalUrl] = useState<string>('');
	const [alias, setAlias] = useState<string | undefined>(undefined);
	const [expiresAt, setExpiresAt] = useState<string | undefined>(undefined);
	const [shortUrl, setShortUrl] = useState<string>('');

	const onClickSubmit = async () => {
		const res = await createShortUrl({
			originalUrl,
			alias,
			expiresAt,
		});

		if (res.error) {
			toast.error(res.error.response?.data.message);
		} else {
			setShortUrl(res.data.shortUrl);
			toast.success('Короткая ссылка успешно создана!');
		}
	};

	return (
		<div className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-lg flex flex-col gap-4">
			<h2 className="text-2xl font-bold text-center text-gray-800">Сократить ссылку</h2>

			<input
				type="text"
				value={originalUrl}
				placeholder="Ссылка для сокращения"
				onChange={(e) => setOriginalUrl(e.target.value)}
				className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
			/>

			<input
				type="text"
				value={alias}
				placeholder="Алиас (не обязательно)"
				onChange={(e) => setAlias(e.target.value)}
				className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
			/>

			<input
				type="datetime-local"
				value={expiresAt}
				onChange={(e) => setExpiresAt(e.target.value)}
				className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
			/>

			<button
				className="bg-blue-600 text-white font-semibold py-3 rounded-xl hover:bg-blue-700 transition duration-200"
				onClick={onClickSubmit}
			>
				Сократить ссылку!
			</button>

			{shortUrl && (
				<div>
					Короткая ссылка готова: <a href={shortUrl}>{shortUrl}</a>
				</div>
			)}
		</div>
	);
};
