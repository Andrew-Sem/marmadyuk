import { PraiseForm } from '@/components/praise-form';
import { Button } from '@/components/ui/button';
import { env } from '@/env.mjs';
import { CommentWithUser } from '@/types/CommentWithUser';
import { SignInButton, currentUser } from '@clerk/nextjs';
import { EnterIcon } from '@radix-ui/react-icons';
import { FC } from 'react';
import Image from 'next/image';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ru';
import { compareDesc } from 'date-fns';

dayjs.extend(relativeTime);
dayjs.locale('ru');

const fetchComments = async (): Promise<CommentWithUser[]> => {
	const res = await fetch(`${env.NEXT_PUBLIC_APP_URL}/api/comments`, {
		next: { revalidate: 60 },
	});
	if (!res.ok) throw new Error('Failed to fetch data');
	return res.json();
};

const Praise: FC = async () => {
	const comments = await fetchComments();
	const sortedComments = comments.sort((a, b) => {
		return compareDesc(new Date(a.comment.createdAt), new Date(b.comment.createdAt));
	});
	const user = await currentUser();
	return (
		<div className='grow flex items-center flex-col'>
			<h2 className='font-medium text-3xl text-center'>Здесь можно похвалить Иру</h2>
			{user ? (
				<PraiseForm />
			) : (
				<div className='text-muted-foreground flex flex-col text-center mt-4'>
					<span className='mb-2'>Чтобы написать похвалу, необходимо</span>
					<SignInButton>
						<Button>
							<EnterIcon className='w-4 h-4' />
							<span className='ml-2'>Войти</span>
						</Button>
					</SignInButton>
				</div>
			)}
			<div className='mt-10 w-full flex flex-col max-w-2xl items-center'>
				<h3 className='text-xl text-muted-foreground'>Последние похвалы:</h3>
				<div className='w-full  mt-4 space-y-4'>
					{sortedComments &&
						sortedComments.length &&
						sortedComments.map(({ comment, author }) => (
							<div key={comment.id} className='bg-secondary/40 rounded-lg p-3'>
								<div className='flex space-x-2'>
									<Image
										src={author.profileImageUrl}
										height={40}
										width={40}
										className='rounded-full'
										alt={author.username || 'Фотокарточка автора'}
									/>
									<div className='flex flex-col justify-center'>
										<div className='text-sm font-semibold'>
											{author.username || 'not found'}
										</div>
										<div className='font-thin text-muted-foreground text-sm'>
											{dayjs(comment.createdAt).fromNow()}
										</div>
									</div>
								</div>
								<div className='mt-2'>{comment.content}</div>
							</div>
						))}
				</div>
			</div>
		</div>
	);
};

export default Praise;
