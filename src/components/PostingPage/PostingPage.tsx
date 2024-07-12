'use client';
import Image from 'next/image';
import { Posting } from './Posting/Posting';

const PostingPage = () => {
  return (
    <div className="bg-zinc-950 w-[640px] h-screen border-2 border-zinc-800 h-auto m-auto ">
      <div className="bg-black">
        <header className="flex justify-between items-center p-5">
          <Image src="/team_logo.png" alt="code_room" width={110} height={110} />
          <Image src="/user.png" alt="profile_img" width={20} height={20} />
        </header>
      </div>
      <main className="container mx-1 px-4">
        <div className="flex-col items-center  mb-2">
          <Image src="/terminal.png" alt="terminal" width={35} height={35} className="mb-4" />
        </div>
        <Posting />
      </main>
    </div>
  );
};

export default PostingPage;
