'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '../ui/dropdown-menu';

const PostingPage = () => {
  // 예시 카테고리 목록
  const categories = [
    'JavaScript',
    'React.js',
    'Next.js',
    'Node.js',
    'TypeScript',
    'Tailwind',
    'Zustand',
    'CSS',
    'Recoil',
    'Zotai',
    'TanStack Query'
  ];

  // 선택된 카테고리 상태 관리
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  // 카테고리 선택 핸들러
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <div className="bg-black min-h-screen">
      <div className="bg-black">
        <header className="flex justify-between items-center p-5">
          <Image src="/team_logo.png" alt="code_room" width={100} height={100} />
          <Image src="/user.png" alt="profile_img" width={20} height={20} />
        </header>
      </div>
      <main className="container mx-auto px-4">
        <div className="flex-col items-center  mb-2">
          <Image src="/terminal.png" alt="terminal" width={40} height={40} className="mb-4" />
          <DropdownMenu>
            <DropdownMenuTrigger className="text-pink-600 hover:text-pink-300 transition-colors duration-200">
              Categories
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuSeparator />
              <DropdownMenuItem>JavaScript</DropdownMenuItem>
              <DropdownMenuItem>React.js</DropdownMenuItem>
              <DropdownMenuItem>Next.js</DropdownMenuItem>
              <DropdownMenuItem>Node.js</DropdownMenuItem>
              <DropdownMenuItem>Node.js</DropdownMenuItem>
              <DropdownMenuItem>Node.js</DropdownMenuItem>
              <DropdownMenuItem>Node.js</DropdownMenuItem>
              <DropdownMenuItem>Node.js</DropdownMenuItem>
              <DropdownMenuItem>Node.js</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="text-white mb-4">{selectedCategory || ''}</div>
        <div className="text-white text-2xl font-bold mb-6">게시글 작성 페이지</div>
        {/* 여기에 게시글 작성 폼을 추가할 수 있습니다 */}
      </main>
    </div>
  );
};

export default PostingPage;
