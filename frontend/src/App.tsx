import { useState } from 'react';
import Index from './routes';
import UrlList from './routes/list.tsx';
import Navbar from './components/Navbar';
import type { ScreenType } from './types.ts';

export default function App() {
	const [screen, setScreen] = useState<ScreenType>('index');

	return (
		<>
			<Navbar
				screen={screen}
				setScreen={setScreen}
			/>
			{screen === 'index' && <Index />}
			{screen === 'list' && <UrlList />}
		</>
	);
}
