import useUserInfo from '@/hooks/useUserInfo';
import { createClient } from '@/supabase/client';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const supabase = createClient();

interface UploadImage {
  uploadFileUrl: string[];
  setUploadFileUrl: React.Dispatch<React.SetStateAction<string[]>>;
}

const UploadImg = ({ uploadFileUrl, setUploadFileUrl }: UploadImage) => {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  useEffect(() => {
    return () => previews.forEach(URL.revokeObjectURL);
  }, [previews]);

  const handleUploadFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (fileList) {
      const fileArray = Array.from(fileList);
      setFiles((prevFiles) => [...prevFiles, ...fileArray]);

      const newPreviews = fileArray.map((file) => URL.createObjectURL(file));
      setPreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);

      for (const file of fileArray) {
        await addImgFile(file);
      }
    }
  };

  const addImgFile = async (file: File) => {
    try {
      const newFileName = uuidv4();
      const { data, error } = await supabase.storage.from('Images').upload(`${newFileName}`, file);
      console.log(data);
      if (error) {
        console.error(error);
        return;
      }
      const test = 'https://pdgwrjxbqywcmuxwjqos.supabase.co/storage/v1/object/public/';

      const res = supabase.storage.from('Images').getPublicUrl(data.path);
      const publicUrl = res.data.publicUrl;

      setUploadFileUrl((prevUrls) => [...prevUrls, publicUrl]);

      const { error: insertError } = await supabase
        .from('post')
        .update({ image: test + data.fullPath })
        .eq('post_id');

      if (insertError) {
        console.error('URL을 post 테이블에 저장하는 중 오류 발생:', insertError);
      }
    } catch (error) {
      console.error('문제가 발생했습니다. 다시 시도해주세요!', error);
    }
  };

  const handleRemovePreview = (index: number) => {
    URL.revokeObjectURL(previews[index]);
    setPreviews((prevPreviews) => prevPreviews.filter((_, i) => i !== index));
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    setUploadFileUrl((prevUrls) => prevUrls.filter((_, i) => i !== index));
  };

  return (
    <div className="flex items-start space-x-4">
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
        {previews.map((preview, index) => (
          <div key={index} className="relative ">
            <div className="relative p-10">
              <div>
                <Image src={preview} alt={`preview-${index}`} layout="fill" objectFit="cover" className="rounded-lg" />
              </div>
              <button
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-3 h-3 flex items-center justify-center text-xs"
                onClick={() => handleRemovePreview(index)}
              >
                X
              </button>
            </div>
          </div>
        ))}
      </div>
      <label className="flex items-center cursor-pointer">
        <Image src="/add_image_icon.png" alt="addImg" width={50} height={50} />
        <input type="file" id="test" multiple accept="image/*" className="hidden" onChange={handleUploadFiles} />
      </label>
    </div>
  );
};

export default UploadImg;
