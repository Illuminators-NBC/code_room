import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default function PostInput() {
  return (
    <Link className="pointer" href="/posting">
      <section className="flex w-[640px] justify-between items-center h-14 sm:h-24 border border-[#2F3336] p-3.5 sm:p-7">
        <div className="flex gap-[11px]">
          <figure>
            <Image src="/terminal-square.png" alt="terminal icon" width={25} height={25} />
          </figure>
          <span className="text-[#676B70] mr-2">아이디어를 공유해보세요!</span>
        </div>
        <Button size="sm" variant="default">
          Post
        </Button>
      </section>
    </Link>
  );
}
