'use client';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import useUserInfo from '@/hooks/useUserInfo';
import { createClient } from '@/supabase/client';
import { Category } from '@/types/category';
import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Control, SubmitHandler, useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';
import CategoryManager from '../Category/CategoryMenu';

const supabase = createClient();

const FormSchema = z.object({
  bio: z
    .string()
    .min(5, {
      message: 'text must be at least 5 characters.'
    })
    .max(500, {
      message: 'text must not be longer than 500 characters.'
    })
});

type FormValues = z.infer<typeof FormSchema>;

export function Posting() {
  const navigate = useRouter();
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const { userInfo } = useUserInfo();
  const [uploadFileUrl, setUploadFileUrl] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema)
  });

  useEffect(() => {
    return () => previews.forEach(URL.revokeObjectURL);
  }, [previews]);

  const handleUploadFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (fileList) {
      const fileArray = Array.from(fileList);
      setFiles((prevFiles) => [...prevFiles, ...fileArray]);

      const newPreviews = fileArray.map((file) => URL.createObjectURL(file));
      setPreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);

      for (const file of fileArray) {
        await addImgFile(file);
      }
    }
  };

  const addImgFile = async (file: File) => {
    try {
      const newFileName = uuidv4();
      const { data, error } = await supabase.storage.from('Images').upload(`${newFileName}`, file);
      if (error) {
        console.error(error);
        return;
      }
      const res = supabase.storage.from('Images').getPublicUrl(data.path);
      const publicUrl = res.data.publicUrl;

      setUploadFileUrl((prevUrls) => [...prevUrls, publicUrl]);
    } catch (error) {
      console.error('문제가 발생했습니다. 다시 시도해주세요!', error);
    }
  };

  const handleRemovePreview = (index: number) => {
    URL.revokeObjectURL(previews[index]);
    setPreviews((prevPreviews) => prevPreviews.filter((_, i) => i !== index));
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    setUploadFileUrl((prevUrls) => prevUrls.filter((_, i) => i !== index));
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const inputData = data.bio;
    try {
      const timestamp = dayjs().format('YYYY-MM-DD HH:mm:ss');
      const { data: postData, error } = await supabase.from('post').insert({
        user_id: userInfo.id,
        content: inputData,
        created_at: timestamp,
        tag: selectedCategories[0]?.name,
        image: uploadFileUrl.join(',')
      });
      if (error) {
        console.error(error);
        throw error;
      }

      toast({
        title: 'You submitted the following values:',
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(data, null, 2)}</code>
          </pre>
        )
      });

      if (window.confirm('게시글이 등록되었습니다. 메인으로 이동하시겠습니까?')) {
        navigate.push('/');
      }

      form.reset();
      setPreviews([]);
      setFiles([]);
      setUploadFileUrl([]);
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error submitting post',
        description: 'There was an error submitting your post. Please try again.',
        variant: 'destructive'
      });
    }
  };

  return (
    <div>
      <div className="flex items-center mb-8 mx-[30px] h-[30px] gap-4">
        <Image src="/terminal.png" alt="terminal" width={30} height={30} />
        <CategoryManager selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} />
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full px-4 sm:px-6 md:px-3 max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto space-y-6 flex flex-col min-h-[50vh]"
        >
          <FormField
            control={form.control as Control<FormValues>}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="Tell us a little bit about yourself"
                    className="resize-none h-40 bg-black text-white"
                    {...field}
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            <div className="flex items-start space-x-4">
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
                {previews.map((preview, index) => (
                  <div key={index} className="relative ">
                    <div className="relative p-10">
                      <div>
                        <Image
                          src={preview}
                          alt={`preview-${index}`}
                          layout="fill"
                          objectFit="cover"
                          className="rounded-lg"
                        />
                      </div>
                      <button
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-3 h-3 flex items-center justify-center text-xs"
                        onClick={() => handleRemovePreview(index)}
                      >
                        X
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-between items-center mt-auto">
              <label className="flex items-center cursor-pointer">
                <Image src="/add_image_icon.png" alt="addImg" width={30} height={30} className="" />
                <input
                  type="file"
                  id="test"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={handleUploadFiles}
                />
              </label>
              <div>
                <Button asChild variant="outline" className="bg-[#27272A] border-none m-2">
                  <Link href="/" className="bg-[#27272A] hover:bg-[#4f4f57] text-white font-semibold">
                    Cancel
                  </Link>
                </Button>
                <button
                  className="bg-[#DD268E] text-white hover:bg-[#FB2EA2] hover:text-black px-5 py-2.5 rounded-md text-sm font-semibold"
                  type="submit"
                >
                  POST
                </button>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
