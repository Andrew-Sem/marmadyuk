import { Space } from '@/components/space';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
	return (
		<>
			<div className='grow flex items-center justify-center flex-col'>
				<h1 className='text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-sky-600'>
					Мармадюк
				</h1>
				<div className='space-x-2 md:space-x-4 mt-10'>
					<Link href={'/game'}>
						<Button>Правила игры</Button>
					</Link>
					<Link href={'/praise'}>
						<Button variant={'outline'}>Похвалите Иру!</Button>
					</Link>
				</div>
			</div>
			<Space />
		</>
	);
}
