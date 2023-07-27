'use client';
import { PaperPlaneIcon } from '@radix-ui/react-icons';
import { FC, useState, FormEvent } from 'react';
import { z } from 'zod';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { useToast } from './ui/use-toast';
import { ToastAction } from './ui/toast';
import { Loader } from './ui/loader';
import { cn } from '@/lib/utils';

export const PraiseForm: FC = () => {
	const { toast } = useToast();
	const [loading, setLoading] = useState(false);
	const [text, setText] = useState('');
	const sendComment = async (e: FormEvent) => {
		e.preventDefault();
		try {
			setLoading(true);
			z.coerce.string().nonempty().max(255).parse(text);
			await fetch(`/api/comments`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					content: text,
				}),
			});
			setText('');
			toast({
				title: 'Похвала успешно доставлена!',
				description: 'В списке появится немного позже',
				action: <ToastAction altText='Поменяйте текст, пожалуйста'>Понев</ToastAction>,
			});
		} catch (error) {
			if (error instanceof z.ZodError)
				toast({
					title: 'Опа!',
					description: error.issues[0].message,
					action: <ToastAction altText='Поменяйте текст, пожалуйста'>Понев</ToastAction>,
				});
			else toast({ title: 'Опа!', description: 'Неизвестная ошибка' });
		}
		setLoading(false);
	};
	return (
		<form
			className='mt-5 flex flex-col gap-2 w-full items-center max-w-lg'
			onSubmit={sendComment}
		>
			<Textarea
				className='max-h-56'
				placeholder='Напиши шо-нибудь'
				onChange={(e) => setText(e.target.value)}
				value={text}
			/>
			<Button className='w-full' type='submit' disabled={loading}>
				<span>Отправить</span>
				{loading ? (
					<Loader className='w-4 h-4 ml-2' />
				) : (
					<PaperPlaneIcon className='w-4 h-4 ml-2' />
				)}
			</Button>
		</form>
	);
};
