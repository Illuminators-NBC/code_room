'use client';
import CommentButton from '@/components/common/CommentButton';
import Header from '@/components/common/Header';
import MyPageLikeButton from '@/components/common/MyPageLikeButton';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import useUserInfo from '@/hooks/useUserInfo';
import { createClient } from '@/supabase/client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

function MyPage() {
  const [postdata, setPostdata] = useState<any[]>([]);
  const [nickname, setNickname] = useState<string>('');
  const [writePost, setWritePost] = useState<boolean>(true);
  const [favoritePost, setFavoritePost] = useState<boolean>(false);
  const [likedPost, setlikedPost] = useState<any[]>([]);
  const { userInfo } = useUserInfo();
  const supabase = createClient();

  useEffect(() => {
    const PostingData = async () => {
      try {
        const { data: UserData, error: UserDataError } = await supabase.auth.getUser();
        if (UserDataError) throw UserDataError;

        const UserId = UserData.user?.id;

        const nickname = userInfo.nickname;
       
        setNickname(nickname);

        const { data, error } = await supabase.from('post').select('*, user(nickname)').eq('user_id', UserId);
        if (error) {
          console.error('오류 발생', error);
        } else {
          setPostdata(data);
        }
      } catch (error) {
        console.error('Data Fetching Error', error);
      }
    };
    PostingData();
  }, [userInfo.nickname, supabase]);

  const WritePosting = async () => {
    try {
      const { data: UserData, error: UserDataError } = await supabase.auth.getUser();
      if (UserDataError) throw UserDataError;

      const UserId = UserData.user?.id;
      const UserNickname = UserData.user?.user_metadata?.nickname;
      setNickname(UserNickname);

      const { data, error } = await supabase.from('post').select('*, user(nickname)').eq('user_id', UserId);
      if (error) {
        console.error('오류 발생', error);
      } else {
        setPostdata(data);
      }
    } catch (error) {
      console.error('Data Fetching Error', error);
    }
  };

  // 좋아요한 글 보여주기
  const FavoritePosting = async () => {
    try {
      const { data: UserData, error: UserDataError } = await supabase.auth.getUser();
      if (UserDataError) throw UserDataError;

      const UserId = UserData.user?.id;
      const UserNickname = UserData.user?.user_metadata?.nickname;
      setNickname(UserNickname);

      const { data: likedPostsIdResponse, error } = await supabase.from('user').select('liked_post').eq('id', UserId);
      if (error) {
        console.error('오류 발생', error);
      }

      if (!likedPostsIdResponse) {
        setlikedPost([]);
        return;
      }
      const likedPostsId = likedPostsIdResponse[0].liked_post as string[];

      const postPromises = likedPostsId?.map(async (postId) => {
        const { data: postData, error: postError } = await supabase
          .from('post')
          .select('*,user(*)')
          .eq('post_id', postId);
        return postData?.[0];
      });
      const likedposts = await Promise.all(postPromises);
      setlikedPost(likedposts);
    } catch (error) {
      console.error('Data Fetching Error', error);
    }
  };

  const WriteShowHandler = () => {
    setWritePost(true);
    WritePosting();
    setFavoritePost(false);
  };

  const FavoriteShowHandler = () => {
    setFavoritePost(true);
    FavoritePosting();
    setWritePost(false);
  };

  const selectData = writePost ? postdata : likedPost;

  return (
    <div className="w-[640px] mx-auto bg-[#09090B] text-white min-h-screen border border-[#27272A]">
      <Header />

      <section className="flex justify-between items-center bg-[#09090B] rounded h-[93px]">
        <span className="text-xl ml-[84px] flex">
          <Image src="/logo_icon.png" width={30} height={30} alt="logo" className="ml-[-37px] mr-[19px]" />
          {userInfo.nickname}
        </span>
        <Link
          href={`/user/${userInfo.id}/edit`}
          className="px-4 py-2 bg-[#DD268E] rounded hover:bg-[#FB2EA2] mr-[30px]"
        >
          프로필 수정
        </Link>
      </section>

      <section>
        <div className="flex justify-center">
          <button
            className={`w-[320px] h-[40px] border border-[#27272A] font-bold ${
              writePost ? 'bg-[#27272A]' : 'bg-[#09090B] hover:bg-[#27272A]'
            }`}
            onClick={WriteShowHandler}
          >
            작성한 글
          </button>
          <button
            className={`w-[320px] h-[40px] border border-[#27272A] font-bold ${
              favoritePost ? 'bg-[#27272A]' : 'bg-[#09090B] hover:bg-[#27272A]'
            }`}
            onClick={FavoriteShowHandler}
          >
            좋아요한 글
          </button>
        </div>
      </section>

      <section>
        {selectData.map((post, index) => {
          return (
            <div key={index} className="bg-[#09090B] rounded mt-4">
              <div className="flex justify-between items-center">
                <span className="ml-[29px] h-[67px] flex items-center font-bold  text-[20px] ">
                {post?.user?.nickname}
                </span> 

                {writePost && (
                  <div className="mr-[28px]">
                    <DropdownMenu>
                      <DropdownMenuTrigger>...</DropdownMenuTrigger>
                      <DropdownMenuContent className="mr-[60px] bg-[#09090B] text-white border-[#27272A]">
                        <Link href={`/post/${post.post_id}`}><DropdownMenuItem>글 삭제</DropdownMenuItem></Link>
                        <Link href={`/post/${post.post_id}`}><DropdownMenuItem>글 수정</DropdownMenuItem></Link>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )}
              </div>

              <div className="mt-2 bg-[#09090B] rounded">
                <div className="px-[29px] border-b border-[#27272A]">
                  {post?.image ? (
                    <>
                      <img className="w-[580px] h-[260px] mb-[19px] " src={post.image} alt="image" />
                      <div className="mb-[19px]">
                        <p className="mt-[20px] mb-[19px] break-words">{post.content}</p>
                        <div className="flex justify-left">
                          <p className="flex gap-[8px]">
                            <MyPageLikeButton /> {post.like}
                          </p>
                          <p className="ml-[19px] flex gap-[8px]">
                            <CommentButton /> {post.comment_count}
                          </p>
                          <p className="ml-[auto]">{post.tag}</p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div>
                      <p className="mt-[-10px] mb-[19px] break-words">{post?.content}</p>
                      <div className="flex justify-left mb-[31px] ">
                        <p className="flex gap-[8px]">
                          <MyPageLikeButton />
                          {post?.like}
                        </p>
                        <p className="ml-[19px] flex gap-[8px]">
                          <CommentButton />
                          {post?.comment_count}
                        </p>
                        <p className="ml-[auto]">{post?.tag}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}

export default MyPage;
