import { SignInButton, SignOutButton, currentUser } from '@clerk/nextjs';
import { FC } from 'react';
import { ExitIcon, EnterIcon } from '@radix-ui/react-icons';
import { Button } from './ui/button';

export const Header: FC = async () => {
	const user = await currentUser();
	return (
		<header className='flex sticky top-0 py-4 justify-end bg-background/50 backdrop-blur-sm '>
			{user ? (
				<SignOutButton>
					<Button variant={'outline'}>
						<ExitIcon className='w-4 h-4' />
						<span className='ml-2'>Выйти</span>
					</Button>
				</SignOutButton>
			) : (
				<SignInButton>
					<Button>
						<EnterIcon className='w-4 h-4' />
						<span className='ml-2'>Войти</span>
					</Button>
				</SignInButton>
			)}
		</header>
	);
};
