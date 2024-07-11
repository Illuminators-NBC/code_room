import { ChangeEventHandler } from 'react';
import { Input } from '../ui/input';
import RandomNickname from '../common/RandomNickname';

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
    <section>
      <Input
        id="nickname"
        name="nickname"
        value={nickname}
        onChange={handleInputChange}
        placeholder="Nickname"
        className="bg-[#27272A] text-white border-[#71717A] inline-flex items-center justify-center w-96 mb-7"
        // disabled
        readOnly
      />
      <RandomNickname onNicknameGenerated={handleNicknameGenerated} />
    </section>
  );
};

export default NicknameSection;
