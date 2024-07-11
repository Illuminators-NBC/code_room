import { Button } from '@/components/ui/button';

interface PostButtonProps {
  className?: string;
}

const PostBtn: React.FC<PostButtonProps> = ({ className }) => {
  return (
    <Button
      variant="outline"
      className={`bg-[#DD268E] text-white hover:bg-[#FB2EA2] hover:text-black transition-colors duration-300 border-none font-semibold justify-end${className}`}
    >
      POST
    </Button>
  );
};

export default PostBtn;
