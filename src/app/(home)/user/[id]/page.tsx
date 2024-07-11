"use client";
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { createClient } from '@/supabase/client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

function MyPage() {
  const [postdata, setPostdata] = useState<any[]>([]);
  const [nickname, setNickname] = useState<string>('');
  const supabase = createClient();

  useEffect(() => {
    const PostingData = async () => {
      try {
        // 로그인 된 유저데이터 저장
        const { data: UserData, error: UserDataError } = await supabase.auth.getUser();
        console.log('유저데이터=> ', UserData);
        // 유저ID 저장
        const UserId = UserData.user?.id;
        console.log('유저ID=> ', UserId);
        // 닉네임 저장
        const UserNickname = UserData.user?.user_metadata?.nickname;
        console.log('불러온 닉네임=>', UserNickname);
        setNickname(UserNickname);

        const { data, error } = await supabase.from("post").select("*").eq("user_id", UserId as string);
        if (error) {
          console.error("오류 발생", error);
        } else {
          setPostdata(data);
          console.log("데이터=> ", data);
        }
      } catch (error) {
        console.error("Data Fetching Error", error)
      }
    };
    PostingData();
  }, []);

  return (
    <div className="w-[640px] mx-auto bg-black text-white min-h-screen ">

      {/* 헤더 */}
      <header className="h-[53px] bg-black border-b border-gray-400 flex justify-between">
        <Image src="/Group 100.png" width={100} height={50} alt="logo" className="m-auto ml-[30px]" />
        <Image src="/user.png" width={30} height={30} alt="user" className="m-auto mr-[30px]" />
      </header>

      {/* 프로필 */}
      <section className="flex justify-between items-center bg-black rounded h-[93px]">
        <span className="text-xl ml-[84px]">{nickname}</span>
        <Button className="px-4 py-2 bg-[#DD268E] rounded hover:bg-[#FB2EA2] mr-[30px]">프로필 수정</Button>
      </section>

      {/* 버튼 */}
      <section>
        <div className="flex justify-center">
          <button className=" bg-black w-[320px] h-[40px] border border-gray-700 hover:bg-gray-700 font-bold">작성한 글</button>
          <button className=" bg-black w-[320px] h-[40px] border border-gray-700 hover:bg-gray-700 font-bold">좋아요한 글</button>
        </div>
      </section>

      {/* 작성한 글 */}
      <section>
        {postdata.map((post, index) => (
          <div key={index} className="bg-black rounded mt-4">
            <div className="flex justify-between items-center">
              <span className="ml-[29px] h-[67px] flex items-center">작성자: {post.nickname}</span>

              {/* 드롭다운 */}
              <div className="mr-[28px]">
                <DropdownMenu>
                  <DropdownMenuTrigger>...</DropdownMenuTrigger>
                  <DropdownMenuContent className="mr-[100px] bg-black text-white border-black">
                    {/* <DropdownMenuLabel>My Account</DropdownMenuLabel> */}
                    {/* <DropdownMenuSeparator /> */}
                    <DropdownMenuItem>글 삭제</DropdownMenuItem>
                    <DropdownMenuItem>글 수정</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* 사진 + 내용 */}
            <div className="mt-2 bg-black rounded">
              <div className="px-[29px] border-b border-gray-400">
                {/* 삼항 연산자 사용해서 처리해보기*/}
                {post.image ? (
                  <>
                    <img className="w-[580px] h-[260px] h-auto object-cover" src={post.image} alt="image" />
                    <div className="px-[29px] border-gray-400">
                      <p className="mt-[20px] mb-[19px] break-words">{post.content}</p>
                      <div className="flex justify-left">
                        <p className="mb-[18px]">❤: {post.like}</p>
                        <p className='ml-[19px]'>📢: {post.comment_count}</p>
                        <p className=' ml-[330px]'>{post.tag}</p>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="px-[29px] ">
                    <p className="mt-[-10px] mb-[19px] break-words">{post.content}</p>
                    <div className="flex justify-left">
                      <p className="mb-[31px]">❤: {post.like}</p>
                      <p className='ml-[19px]'>📢: {post.comment_count}</p>
                      <p className=' ml-[330px]'>{post.tag}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

export default MyPage;
