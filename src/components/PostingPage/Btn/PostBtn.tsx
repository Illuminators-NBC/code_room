import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface PostButtonProps {
  className?: string;
}

const PostBtn: React.FC<PostButtonProps> = () => {
  return (
    <Button
      variant="outline"
      className="bg-[#DD268E] text-white hover:bg-[#FB2EA2] hover:text-black transition-colors duration-300 border-none font-semibold  justify-end"
    >
      <Link href="/">POST</Link>
    </Button>
  );
};

export default PostBtn;
