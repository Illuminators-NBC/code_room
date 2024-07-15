import Image from 'next/image';
import { Posting } from './Posting/Posting';

const PostingPage = () => {
  return (
    <div className="bg-zinc-950 w-[640px] h-screen border-2 border-zinc-800 h-auto m-auto">
      <main className="container mx-1 px-4 mt-[30px]">
        <div className="flex-col items-center  mb-2">
          <Image src="/terminal.png" alt="terminal" width={35} height={35} className="mb-4" />
        </div>
        <Posting />
      </main>
    </div>
  );
};

export default PostingPage;
