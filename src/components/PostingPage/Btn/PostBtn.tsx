import { Button } from '@/components/ui/button';
import { PostButton } from '@/types/category';

const PostBtn: React.FC<PostButton> = () => {
  return (
    <Button
      variant="outline"
      className=" bg-[#DD268E] text-white hover:bg-[#FB2EA2] hover:text-black transition-colors duration-300 border-none  font-semibold justify-end"
    >
      POST
    </Button>
  );
};

export default PostBtn;
