'use client';

import { useState } from 'react';

function CommentForm() {
  const [content, setContent] = useState<string>('');

  return (
    <form className="text-white h-10 flex items-center justify-between w-full gap-[28px]">
      <input
        className="font-medium text-sm px-4 h-full rounded-[6px] bg-[#27272A] outline-none w-full placeholder:text-[#71717A]"
        placeholder="댓글을 작성하세요"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button className="font-medium text-sm px-4 h-full rounded-[6px] bg-[#27272A] hover:bg-[#DD268E] transition">
        Post
      </button>
    </form>
  );
}

export default CommentForm;
