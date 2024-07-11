'use client';
import AuthObserver from '@/components/common/AuthObserver';
import LogoutButton from '@/components/LoginPage/LogoutButton';
import useUserInfo from '@/hooks/useUserInfo';

function HomePage() {
  const { userInfo } = useUserInfo();
  return (
    <>
      <div>HomePage</div>
      <LogoutButton />
      <p>Nickname: {userInfo.nickname}</p>
      <p>Id: {userInfo.id}</p>
    </>
  );
}

export default HomePage;
