import { Comment } from '@/utils/api';

interface CommentItemProps {
  comment: Comment;
}

function CommentItem({ comment }: CommentItemProps) {
  return (
    <div className="py-8 border-b border-[#2F3336] flex flex-col gap-5">
      <div className="flex items-center justify-between font-medium">
        <p>{comment.nickname}</p>
        <button className="text-xl">...</button>
      </div>
      <p>{comment.content}</p>
    </div>
  );
}

export default CommentItem;
