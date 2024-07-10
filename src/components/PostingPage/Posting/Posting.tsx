'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler, Control } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import Link from 'next/link';
import PostBtn from '../Btn/PostBtn';
import { useState } from 'react';

import MDEditor from '@uiw/react-md-editor';

const FormSchema = z.object({
  bio: z
    .string()
    .min(10, {
      message: 'text must be at least 10 characters.'
    })
    .max(500, {
      message: 'text must not be longer than 500 characters.'
    })
});

type FormValues = z.infer<typeof FormSchema>;

export function Posting() {
  const [value, setValue] = useState('');
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema)
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      )
    });
  };

  return (
    <div className="container">
      <MDEditor value={value} onChange={setValue} />
      <MDEditor.Markdown source={value} style={{ whiteSpace: 'pre-wrap' }} />
    </div>
    // <Form {...form}>
    //   <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
    //     <FormField
    //       control={form.control as Control<FormValues>}
    //       name="bio"
    //       render={({ field }) => (
    //         <FormItem>
    //           <FormLabel></FormLabel>
    //           <FormControl>
    //             <Textarea
    //               placeholder="Tell us a little bit about yourself"
    //               className="resize-none h-40 bg-black text-white"
    //               {...field}
    //             />
    //           </FormControl>
    //           <FormDescription></FormDescription>
    //           <FormMessage />
    //         </FormItem>
    //       )}
    //     />
    //     <Button asChild variant="outline" className="bg-[#27272A] border-none m-2">
    //       <Link href="/" className="bg-[#27272A] hover:bg-[#71717A] text-white font-semibold ">
    //         Cancel
    //       </Link>
    //     </Button>
    //     <PostBtn type="submit" />
    //   </form>
    // </Form>
  );
}
