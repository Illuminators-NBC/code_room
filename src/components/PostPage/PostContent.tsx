'use client';

import { usePostQuery } from '@/hooks';
import usePostMutation from '@/hooks/usePostMutation';
import useUserInfo from '@/hooks/useUserInfo';
import { createClient } from '@/supabase/client';
import { Tables } from '@/types/supabase';
import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { categories } from '../PostingPage/Category/CategoryMenu';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';

interface PostContentProps {
  initialPostData: Tables<'post'>;
}

function PostContent({ initialPostData }: PostContentProps) {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const { userInfo } = useUserInfo();
  const { data: post } = usePostQuery(id, initialPostData);
  const { user_id, image, content, created_at, like, tag, updated_at, comment_count } = post;

  const { deletePostMutation } = usePostMutation();

  const formattedDate = dayjs(updated_at ? updated_at : created_at).format('h:mm A · MMM D, YYYY');

  const categorie = tag && categories.find((categorie) => categorie.name === tag);

  const [nickname, setNickname] = useState<Tables<'user'>['nickname']>('');

  const supabaseClient = createClient();

  const handleDeletePost = () => {
    deletePostMutation.mutate({ id });
    router.push('/');
  };

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
    <div className="w-full pt-[30px] text-white">
      <div className="min-h-[300px]">
        <div className="flex justify-between items-center mb-5 font-medium">
          <p>{nickname}</p>
          {userInfo.id === user_id && (
            <DropdownMenu>
              <DropdownMenuTrigger className="outline-none">...</DropdownMenuTrigger>
              <DropdownMenuContent className="bg-black text-[15px] font-medium text-white border-[#2F3336]">
                <DropdownMenuItem className="w-full justify-center cursor-pointer">
                  <Link href={`/post/${id}/edit`}>피드 수정</Link>
                </DropdownMenuItem>
                <hr className="border-b border-[#2F3336]" />
                <DropdownMenuItem onClick={handleDeletePost} className="w-full justify-center cursor-pointer">
                  피드 삭제
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
        {image && (
          <div className="relative aspect-video mb-5 rounded-[10px] overflow-hidden">
            <Image src={image} fill alt="" className="object-cover" />
          </div>
        )}
        <p className="break-words mb-[30px]">{content}</p>
      </div>

      <div className="flex justify-between items-center py-[33px] border-[#2F3336] border-y">
        <div className="flex items-center gap-[18px]">
          <p>{formattedDate}</p>
          <div className="flex items-center gap-1">
            <Image src="/heart.svg" width={22} height={22} alt="heart" />
            <p>{like ? like : 0}</p>
          </div>
          <div className="flex items-center gap-1">
            <Image src="/message-square.svg" width={22} height={22} alt="message-square" />
            <p>{comment_count}</p>
          </div>
        </div>
        {tag && (
          <div
            className={`px-2 py-1 rounded-full text-sm flex items-center ${categorie.backgroundColor} ${categorie.color}`}
          >
            {categorie.name}
          </div>
        )}
      </div>
    </div>
  );
}

export default PostContent;
