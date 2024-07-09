import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';

function AccountEditPage() {
  return (
    <div className="text-white bg-zinc-950 w-[640px] h-screen boder-2 border-zinc-800 h-auto m-auto text-center">
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
        <button>
          <Image src={'/Refrech_icon.png'} alt="refresh icon" width="16" height="16" />
        </button>
      </p>
      <div>
        <form action="" className="m-auto">
          <Input className="w-96 h-10 p-4 mb-7" type="text" placeholder="Email@email.com" />
          <Input className="w-96 h-10 p-4 mb-7" type="text" placeholder="password" />
          <Input className="w-96 h-10 p-4 mb-8" type="text" placeholder="confirm password" />
        </form>
      </div>
    </div>
  );
}

export default AccountEditPage;
