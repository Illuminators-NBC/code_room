import useUserInfo from '@/hooks/useUserInfo';
import { postProps } from '@/types/posts';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LikeButton({ post_id }: postProps): JSX.Element {
  const router = useRouter();
  const [liked, setLiked] = useState(false);
  const { userInfo } = useUserInfo();
  const { id: user_id, email } = userInfo;

  const onClickLike = async () => {
    if (!user_id) {
      router.push('/sign-up');
    } else {
      setLiked(!liked);
      const response = await fetch('/api/home', {
        method: 'POST',
        body: JSON.stringify({ email, post_id })
      });
    }
  };

  return (
    <div
      className={`relative w-6 h-6 cursor-pointer transition-transform duration-300 ${
        liked ? 'scale-110' : 'scale-100'
      }`}
      onClick={onClickLike}
    >
      {liked ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-full h-full text-red-500"
        >
          <path
            fillRule="evenodd"
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            clipRule="evenodd"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          className="w-full h-full text-gray-400"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          />
        </svg>
      )}
    </div>
  );
}
