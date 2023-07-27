import { db } from '@/lib/db';
import { clerkClient, currentUser } from '@clerk/nextjs';
import { type User } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

const filterUserForClient = (user: User) => {
	return {
		id: user.id,
		username: user.username || user.firstName,
		profileImageUrl: user.profileImageUrl,
	};
};

export const POST = async (req: NextRequest) => {
	try {
		const user = await currentUser();
		if (!user) return new NextResponse(null, { status: 403 });

		const { content } = await req.json();

		await db.comment.create({
			data: {
				content,
				authorID: user.id,
			},
		});
		return new NextResponse(null, { status: 200 });
	} catch (e) {
		console.log(e);
		return new NextResponse(null, { status: 500 });
	}
};

export const GET = async () => {
	try {
		const comments = await db.comment.findMany({
			take: 20,
		});

		const users = (
			await clerkClient.users.getUserList({
				userId: comments.map((comment) => comment.authorID),
				limit: 100,
			})
		).map(filterUserForClient);

		const commentsWithUsers = comments.map((comment) => {
			const author = users.find((user) => comment.authorID === user.id);
			return {
				author,
				comment,
			};
		});

		return new NextResponse(JSON.stringify(commentsWithUsers));
	} catch (e) {
		return new NextResponse(null, { status: 500 });
	}
};
