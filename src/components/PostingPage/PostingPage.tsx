'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import DropdouwnMenu from './Dropdown';
const PostingPage = () => {
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
          <DropdouwnMenu />
        </div>
        <p className="text-white">게시글</p>
      </main>
    </div>
  );
};

export default PostingPage;
