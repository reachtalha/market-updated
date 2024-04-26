import { useState } from 'react';
import { PlusIcon } from '@radix-ui/react-icons';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

interface SocialMediaSelectProps {
  onAddButton: (selectedSocialMedia: string, link: string) => void;
  socialMediaOptions: any;
  setSocialMediaOptions: any;
  isEdit?: boolean;
}

const SocialMediaSelect: React.FC<SocialMediaSelectProps> = ({
  onAddButton,
  socialMediaOptions,
  setSocialMediaOptions,
  isEdit = true
}) => {
  const [selectedSocialMedia, setSelectedSocialMedia] = useState('');
  const [link, setLink] = useState('');

  const handleSocialMediaChange = (c: string) => {
    setSelectedSocialMedia(c);
  };

  const handleLinkChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLink(event.target.value);
  };

  const handleAddClick = () => {
    if (!selectedSocialMedia || !link) {
      return;
    }
    onAddButton(selectedSocialMedia, link);
    setSocialMediaOptions((prevOptions: any) =>
      prevOptions.filter((option: any) => option !== selectedSocialMedia)
    );
    setSelectedSocialMedia('');
    setLink('');
  };

  return (
    <>
      <Label htmlFor="socialMedia">Social Media</Label>
      <div className="w-full flex gap-x-1 rounded-md overflow-hidden p-1 border-[1px] border-neutral-200 placeholder:text-sm focus-within:ring-0 focus-within:ring-neutral-300 focus-within:ring-offset-0">
        <Select
          value={selectedSocialMedia === '' ? undefined : selectedSocialMedia}
          onValueChange={(c) => {
            console.log(c);
            handleSocialMediaChange(c);
          }}
          disabled={!isEdit}
        >
          <SelectTrigger className="w-28 focus:outline-none pl-1">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            {socialMediaOptions.map((option: any, index: any) => (
              <SelectItem value={option} key={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Input
          type="text"
          id="link"
          value={link}
          disabled={!isEdit}
          onChange={handleLinkChange}
          className="focus:outline-none w-full px-1.5 py-1.5 focus-visible:ring-0 focus-visible:ring-offset-0"
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
