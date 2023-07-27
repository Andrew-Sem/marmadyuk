import { User } from '@clerk/nextjs/server';
import { Comment } from '@prisma/client';

export type CommentWithUser = {
	comment: Comment;
	author: Pick<User, 'id' | 'username' | 'profileImageUrl'>;
};
