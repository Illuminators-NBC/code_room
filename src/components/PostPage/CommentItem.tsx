'use client';

import useCommentMutation from '@/hooks/useCommentMutation';
import useUserInfo from '@/hooks/useUserInfo';
import { createClient } from '@/supabase/client';
import { Tables } from '@/types/supabase';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';

interface CommentItemProps {
  comment: Tables<'comments'>;
}

function CommentItem({ comment }: CommentItemProps) {
  const { id } = useParams<{ id: string }>();
  const { comment_id, content, created_at, updated_at, like_count, user_id } = comment;
  const { updateCommentMutation, deleteCommentMutation } = useCommentMutation();
  const { userInfo } = useUserInfo();

  const [nickname, setNickname] = useState<Tables<'user'>['nickname']>('');
  const [newCommentContent, setNewCommentContent] = useState<string>('');
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  const handleDeleteComment = () => {
    deleteCommentMutation.mutate({ id, commentId: comment_id });
  };

  const handleEditComment = () => {
    updateCommentMutation.mutate({ id, commentId: comment_id, newCommentContent });
    setIsEditMode(false);
  };

  const supabaseClient = createClient();

  useEffect(() => {
    (async () => {
      const { data, error } = await supabaseClient.from('user').select('*').eq('id', user_id);
      if (error) {
        throw new Error(error.message);
      }

      setNickname(data[0].nickname);
    })();
  }, [supabaseClient, user_id]);

  return (
    <div className="py-8 border-b border-[#2F3336] flex flex-col gap-5">
      <div className="flex items-center justify-between font-medium">
        <p>{nickname}</p>
        {userInfo.id === user_id && (
          <>
            {isEditMode ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleEditComment}
                  className="font-medium text-xs px-4 h-6 rounded-[6px] bg-[#27272A] hover:bg-[#DD268E] transition"
                >
                  수정하기
                </button>
                <button
                  onClick={() => setIsEditMode(false)}
                  className="font-medium text-xs px-4 h-6 rounded-[6px] bg-[#27272A] hover:bg-[#DD268E] transition"
                >
                  취소
                </button>
              </div>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger className="outline-none">...</DropdownMenuTrigger>
                <DropdownMenuContent className="bg-black text-[15px] font-medium text-white border-[#2F3336]">
                  <DropdownMenuItem
                    onClick={() => setIsEditMode(true)}
                    className="w-full justify-center cursor-pointer"
                  >
                    댓글 수정
                  </DropdownMenuItem>
                  <hr className="border-b border-[#2F3336]" />
                  <DropdownMenuItem onClick={handleDeleteComment} className="w-full justify-center cursor-pointer">
                    댓글 삭제
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </>
        )}
      </div>
      {isEditMode ? (
        <input
          className="font-medium text-sm px-4 h-10 rounded-[6px] bg-[#27272A] outline-none w-full placeholder:text-[#71717A]"
          placeholder={content}
          value={newCommentContent ? newCommentContent : content}
          onChange={(e) => setNewCommentContent(e.target.value)}
        />
      ) : (
        <p>{content}</p>
      )}
    </div>
  );
}

export default CommentItem;
