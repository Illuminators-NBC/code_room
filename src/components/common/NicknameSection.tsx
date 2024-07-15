import { ChangeEventHandler } from 'react';
import RandomNickname from '../common/RandomNickname';
import { Input } from '../ui/input';

interface NicknameSectionProps {
  nickname: string;
  onNicknameChange: (nickname: string) => void;
}

const NicknameSection: React.FC<NicknameSectionProps> = ({ nickname, onNicknameChange }) => {
  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    onNicknameChange(e.target.value);
  };

  const handleNicknameGenerated = (generatedNickname: string) => {
    onNicknameChange(generatedNickname);
  };
  return (
    <section className="w-96 h-10 mx-auto mb-7 relative">
      <Input
        id="nickname"
        name="nickname"
        value={nickname}
        onChange={handleInputChange}
        placeholder="nickname"
        className="bg-[#27272A] text-white border-[#71717A] inline-flex items-center justify-center w-96 mb-7"
        readOnly
      />
      <RandomNickname onNicknameGenerated={handleNicknameGenerated} />
    </section>
  );
};

export default NicknameSection;
