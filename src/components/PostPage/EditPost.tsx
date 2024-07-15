'use client';

import usePostMutation from '@/hooks/usePostMutation';
import { createClient } from '@/supabase/client';
import { Category } from '@/types/category';
import { Tables } from '@/types/supabase';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { ChangeEvent, useEffect, useState } from 'react';
import CategoryManager, { categories } from '../PostingPage/Category/CategoryMenu';
import { Button } from '../ui/button';

interface EditPostProps {
  initialPostData: Tables<'post'>;
}

function EditPost({ initialPostData }: EditPostProps) {
  const { content: prevContent, tag: prevTag, image: prevImageURL } = initialPostData;
  const supabase = createClient();

  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [editedContent, setEditedContent] = useState<string>(prevContent);
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [imgPreviewURL, setImgPreviewURL] = useState<string | null>(null);
  const [imgFile, setImgFile] = useState<File | null>(null);

  const { updatePostMutation } = usePostMutation();

  const addImgFileInStorage = async () => {
    if (imgFile) {
      const newFileName = crypto.randomUUID();
      const { data, error } = await supabase.storage.from('Images').upload(`${newFileName}`, imgFile);

      if (error) {
        throw new Error(error.message);
      }

      const res = supabase.storage.from('Images').getPublicUrl(data.path);

      const publicUrl = res.data.publicUrl;
      return publicUrl;
    }
  };

  const handleChangeImgFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImgFile = e.target.files[0];
      setImgFile(newImgFile);
      setImgPreviewURL(URL.createObjectURL(newImgFile));
    }
  };

  const handleUpdatePost = async () => {
    const publicUrl = await addImgFileInStorage();

    const newPost: Pick<Tables<'post'>, 'content'> & Pick<Partial<Tables<'post'>>, 'image' | 'tag'> = {
      content: editedContent,
      image: publicUrl ? publicUrl : null,
      tag: selectedCategories[0].name
    };
    updatePostMutation.mutate({ id, newPost });
    router.back();
  };

  useEffect(() => {
    if (prevImageURL) {
      setImgPreviewURL(prevImageURL);
    }

    if (prevTag) {
      setSelectedCategories([categories.find((category) => category.name === prevTag) as Category]);
    }
  }, [prevImageURL, prevTag]);

  return (
    <>
      <Image src="/terminal.png" alt="terminal" width={35} height={35} className="mb-[18px] mt-[26px]" />
      <div className="py-4">
        <CategoryManager selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} />
      </div>
      <div className="flex flex-col gap-5">
        <textarea
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
          className="w-full bg-transparent outline-none border-[#2F3336] border p-4 min-h-[300px] text-white"
        />
        <div className="relative aspect-video max-w-[240px] rounded-[12px] overflow-hidden">
          {imgPreviewURL && (
            <>
              <Image src={imgPreviewURL} fill className="absolute" alt="" />
              <button
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                onClick={() => {
                  setImgFile(null);
                  setImgPreviewURL(null);
                }}
              >
                X
              </button>
            </>
          )}
        </div>
        <div className="flex justify-between items-center">
          <input type="file" id="img_file" accept="image/*" className="hidden" onChange={handleChangeImgFile} />
          <label htmlFor="img_file" className="cursor-pointer hover:brightness-75 active:brightness-90 transition">
            <Image src="/add_image_icon.png" alt="addImg" width={40} height={35} />
          </label>
          <div className="flex justify-end items-center gap-5">
            <Button className="bg-[#27272A] hover:bg-[#4f4f57] text-white font-semibold">
              <Link href={`/post/${id}`}>Cancel</Link>
            </Button>
            <Button onClick={handleUpdatePost}>Edit</Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditPost;
