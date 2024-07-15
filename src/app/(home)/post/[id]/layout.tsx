import Header from '@/components/common/Header';
import { PropsWithChildren } from 'react';

function PostPageLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      <main className="bg-black min-w-[365px] max-w-[640px] w-full h-[calc(100vh-53px)] m-auto border-x border-[#2F3336] flex flex-col px-[30px]">
        {children}
      </main>
    </>
  );
}

export default PostPageLayout;
