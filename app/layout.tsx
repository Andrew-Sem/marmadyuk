import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import { Header } from '@/components/header';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Мармадюк',
	description: 'Похвалите, пожалуйста',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<ClerkProvider>
			<html lang='ru' className='dark'>
				<body className={inter.className}>
					<div className='flex flex-col min-h-screen container'>
						<Header />
						<main className='flex flex-col grow py-6'>{children}</main>
					</div>
					<Toaster />
				</body>
			</html>
		</ClerkProvider>
	);
}
