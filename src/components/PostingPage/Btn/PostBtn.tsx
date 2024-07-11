import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface PostButtonProps {
  className?: string;
}

const PostBtn: React.FC<PostButtonProps> = () => {
  return (
    <Link href="/">
      <Button
        variant="outline"
        className="bg-[#DD268E] text-white hover:bg-[#FB2EA2] hover:text-black transition-colors duration-300 border-none font-semibold  justify-end"
      >
        POST
      </Button>
    </Link>
  );
};

export default PostBtn;
