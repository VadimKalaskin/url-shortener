import { AddUrlForm } from '../components/AddUrlForm';

export default function Index() {
	return (
		<main className={'max-w-screen-lg mx-auto flex flex-col gap-4 py-8'}>
			<h1 className={'text-2xl text-center'}>Сервис для сокращения ссылок</h1>
			<AddUrlForm />
		</main>
	);
}
