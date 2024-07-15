import Header from '../common/Header';
import { Posting } from './Posting/Posting';

const PostingPage = () => {
  return (
    <div className="bg-zinc-950 w-[640px] h-screen border-2 border-zinc-800 m-auto">
      <Header />
      <main className="container mx-1 px-4 mt-[30px]">
        <Posting />
      </main>
    </div>
  );
};

export default PostingPage;
