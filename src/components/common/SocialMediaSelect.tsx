import { useState } from 'react';
import { PlusIcon } from '@radix-ui/react-icons';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface SocialMediaSelectProps {
  onAddButton: (selectedSocialMedia: string, link: string) => void;
}

const SocialMediaSelect: React.FC<SocialMediaSelectProps> = ({ onAddButton }) => {
  const [selectedSocialMedia, setSelectedSocialMedia] = useState('');
  const [link, setLink] = useState('');
  const options = ['Facebook', 'Instagram', 'TikTok', 'Twitter', 'YouTube', 'Website'];

  const handleSocialMediaChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSocialMedia(event.target.value);
  };

  const handleLinkChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLink(event.target.value);
  };

  const handleAddClick = () => {
    if (!selectedSocialMedia || !link) {
      return;
    }
    onAddButton(selectedSocialMedia, link);
    setSelectedSocialMedia('');
    setLink('');
  };

  return (
    <>
      <Label htmlFor="socialMedia" className="text-sm text-gray-600">
        Social Media
      </Label>
      <div className="w-full flex gap-x-1 rounded-xl overflow-hidden p-1 border-[2px] border-gray-200 transition-transform delay-75 duration-300 placeholder:text-sm hover:border-neutral-800  focus-within:outline-neutral-800">
        <select
          id="socialMedia"
          value={selectedSocialMedia}
          onChange={handleSocialMediaChange}
          className="w-28 focus:outline-none pl-1"
        >
          <option selected value="">
            Select
          </option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <Input
          type="text"
          id="link"
          value={link}
          onChange={handleLinkChange}
          className="focus:outline-none w-full px-1.5 py-1.5"
          placeholder="Enter social media link"
        />

        <button
          type="button"
          disabled={!selectedSocialMedia || !link ? true : false}
          className="bg-primary opacity-90 hover:opacity-100 disabled:cursor-not-allowed rounded-lg px-2 py-1.5"
          onClick={handleAddClick}
        >
          <PlusIcon className="w-5 h-5 text-white" />
        </button>
      </div>
    </>
  );
};

export default SocialMediaSelect;
