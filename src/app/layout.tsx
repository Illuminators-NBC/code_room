import Providers from '@/components/Providers';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Image from 'next/image';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'code_room',
  description: 'Generated by create next app'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="w-screen p-0 m-0 bg-zinc-950">
        <header>
          <div className="w-[640px] h-[53px] m-auto bg-zinc-950 items-center justify-between px-[30px] flex border border-zinc-800">
            <Image src={'/logo.png'} alt="logo" width="93" height="14" />
            <div className="로그인O flex">
              <Link href={'/user'}>
                <Image src={'/mypage_icon.png'} alt="mypage" width="16" height="20" />
              </Link>
              <Link href={'/'} className="ml-5">
                <Image src={'/logout_icon.png'} alt="mypage" width="20" height="20" />
              </Link>
            </div>

            {/* <div className="로그인X">
              <Link href={'/login'}>
                <Image src={'/login_icon.png'} alt="mypage" width="16" height="20" />
              </Link>
              <Link href={'/sign-up'}>
                <Image src={'/signup_icon.png'} alt="mypage" width="20" height="20" />
              </Link>
            </div> */}
          </div>
        </header>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
