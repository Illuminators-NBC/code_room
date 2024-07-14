'use client';

import { Category } from '@/types/category';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import CategoryManager from '../PostingPage/Category/CategoryMenu';
import { Button } from '../ui/button';

function EditPost() {
  const { id } = useParams<{ id: string }>();

  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [imgFile, setImgFile] = useState<File | null>(null);
  return (
    <>
      <Image src="/terminal.png" alt="terminal" width={35} height={35} className="mb-[18px] mt-[26px]" />
      <div className="-mx-5 min-h-24">
        <CategoryManager selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} />
      </div>
      <div className="flex flex-col gap-5">
        <textarea className="w-full bg-transparent outline-none border-[#2F3336] border p-4 min-h-[300px]" />
        <div className="relative aspect-video max-w-[240px] rounded-[12px] overflow-hidden">
          {imgFile && (
            <>
              <Image src={URL.createObjectURL(imgFile)} fill className="absolute" alt="" />
              <button
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                onClick={() => setImgFile(null)}
              >
                X
              </button>
            </>
          )}
        </div>
        <div className="flex justify-between items-center">
          <input
            type="file"
            id="img_file"
            accept="image/*"
            className="hidden"
            onChange={(e) => e.target.files && setImgFile(e.target.files[0])}
          />
          <label htmlFor="img_file" className="cursor-pointer hover:brightness-75 active:brightness-90 transition">
            <Image src="/add_image_icon.png" alt="addImg" width={40} height={35} />
          </label>
          <div className="flex justify-end items-center gap-5">
            <Button className="bg-[#27272A] hover:bg-[#4f4f57] text-white font-semibold">
              <Link href={`/post/${id}`}>Cancel</Link>
            </Button>
            <Button>Edit</Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditPost;
