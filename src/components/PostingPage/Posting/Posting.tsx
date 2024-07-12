'use client';
import dayjs from 'dayjs';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler, Control } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import Link from 'next/link';
import { createClient } from '@/supabase/client';
import useUserInfo from '@/hooks/useUserInfo';
import CategoryManager from '../Category/CategoryMenu';
import { useState } from 'react';
import { Category } from '@/types/category';
import { useRouter } from 'next/navigation';
import UploadImg from '../Upload_img/UploadImg';

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
//
export function Posting() {
  const navigate = useRouter();
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const { userInfo } = useUserInfo();
  const [uploadFileUrl, setUploadFileUrl] = useState([]);
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema)
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const inputData = data.bio;
    try {
      const timestamp = dayjs().format('YYYY-MM-DD HH:mm:ss');
      const { data: postData, error } = await supabase.from('post').insert({
        user_id: userInfo.id,
        content: inputData,
        created_at: timestamp,
        tag: selectedCategories[0]?.name
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

      form.reset();
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
      <div>
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
                <FormLabel></FormLabel>
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
            <div className="flex justify-end items-center mt-auto">
              <UploadImg uploadFileUrl={uploadFileUrl} setUploadFileUrl={setUploadFileUrl} />
              <Button asChild variant="outline" className="bg-[#27272A] border-none m-2">
                <Link href="/" className="bg-[#27272A] hover:bg-[#4f4f57] text-white font-semibold">
                  Cancel
                </Link>
              </Button>
              <button
                className="bg-[#DD268E] text-white hover:bg-[#FB2EA2] hover:text-black px-5 py-2.5 rounded-md text-sm font-semibold"
                type="submit"
                // onClick={() => navigate.push('/')}
              >
                POST
              </button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
