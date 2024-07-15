'use client';
import useUserInfo from '@/hooks/useUserInfo';
import Image from 'next/image';
import Link from 'next/link';
import LogoutButton from '../LoginPage/LogoutButton';

const Header = () => {
  const { userInfo } = useUserInfo();
  return (
    <header>
      <div className="w-[640px] h-[53px] m-auto bg-zinc-950 items-center justify-between px-[30px] flex border border-zinc-800">
        <Link href={'/'}>
          <Image src={'/logo.png'} alt="logo" width="93" height="14" />
        </Link>
        {userInfo.id ? (
          <div className="로그인O flex">
            <div className="mr-4 mt-[12px]">
              <Link href={`/user/${userInfo.id}`}>
                <Image src={'/mypage_icon.png'} alt="mypage" width="16" height="20" />
              </Link>
            </div>
            <div className="items-center">
              <LogoutButton />
            </div>
          </div>
        ) : (
          <div className="로그인X flex">
            <div className="mr-4">
              <Link href={'/sign-up'}>
                <Image src={'/signup_icon.png'} alt="mypage" width="20" height="20" />
              </Link>
            </div>
            <div className="mt-[2px]">
              <Link href={'/login'}>
                <Image src={'/login_icon.png'} alt="mypage" width="16" height="20" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
