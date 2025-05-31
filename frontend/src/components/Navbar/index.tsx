import type { ScreenType } from '../../types.ts';
import type { Dispatch, SetStateAction } from 'react';

type Props = {
	screen: ScreenType;
	setScreen: Dispatch<SetStateAction<ScreenType>>;
};

export default function Navbar({ screen, setScreen }: Props) {
	const handleClick = (screen: ScreenType) => {
		setScreen(screen);
	};

	return (
		<section className={'w-full py-4 border-b px-10 flex items-center justify-center gap-4'}>
			<button
				onClick={() => handleClick('index')}
				className={screen === 'index' ? 'font-bold' : ''}
			>
				Главная
			</button>
			<button
				onClick={() => handleClick('list')}
				className={screen === 'list' ? 'font-bold' : ''}
			>
				Все ссылки
			</button>
		</section>
	);
}
