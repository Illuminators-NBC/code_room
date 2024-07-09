import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';

function AccountEditPage() {
  return (
    <div className="bg-zinc-950 w-screen h-screen">
      <div className="text-white bg-zinc-950 w-[640px] h-screen border border-zinc-800 m-auto p-[30px] text-center ">
        <p>마이페이지 프로필 수정</p>
        <Image
          src={'/logo_icon.png'}
          alt="code_room logo icon"
          width="50"
          height="50"
          className="m-auto mt-[83px] mb-[28px]"
        />
        <p className="text-xl font-bold	">
          <span>🌊 </span> 헤엄치는 피즈{' '}
          <button className="ml-2 ">
            <Image src={'/refresh_icon.png'} alt="refresh icon" width="16" height="16" />
          </button>
        </p>
        <div>
          <form className="mt-8">
            <Input
              className="w-96 h-10 bg-[#27272A] border-zinc-600 p-4 m-auto mb-7 text-white"
              type="email"
              placeholder="Email@email.com"
            />
            <Input
              className="w-96 h-10 bg-[#27272A] border-zinc-600 p-4 m-auto mb-7 text-white"
              type="password"
              placeholder="password"
            />
            <Input
              className="w-96 h-10 bg-[#27272A] border-zinc-600 p-4 m-auto mb-7 text-white"
              type="password"
              placeholder="confirm password"
            />
            <Button
              className="w-96 h-10 mt-8 bg-[#DD268E] border-0 font-bold hover:bg-[#FB2EA2] hover:text-white"
              variant="outline"
            >
              수 정
            </Button>
            <Button
              className="w-96 h-10 mt-5 bg-[#27272A] border-0 font-bold hover:bg-[#2d2d30] hover:text-white"
              variant="outline"
            >
              취 소
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AccountEditPage;
