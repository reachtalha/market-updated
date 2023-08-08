import { useState, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { Label } from '@/components/ui/label';

import { Button } from '@/components/ui/button';
import SocialMediaSelect from '@/components/common/SocialMediaSelect';
import SocialMediaList from '@/components/common/SocialMediaList';
import TopicList from './TopicList';

interface SocialMedia {
  type: string;
  link: string;
}

const Influencer = () => {
  const {
    register,
    formState: { errors },
    setValue
  } = useFormContext();

  const [socialMediaList, setSocialMediaList] = useState<SocialMedia[]>([]);
  const [topics, setTopics] = useState<string[]>([]);

  useEffect(() => {
    setValue('socialMediaLinks', socialMediaList);
  }, [socialMediaList]);

  const handleTopicsChange = (updatedTopics: string[]) => {
    setTopics(updatedTopics);
    setValue('topics', updatedTopics);
  };

  const handleAddButton = (selectedSocialMedia: string, link: string) => {
    setSocialMediaList([
      ...socialMediaList,
      {
        type: selectedSocialMedia,
        link: link
      }
    ]);
  };

  const deleteSocialLink = (index: number) => {
    setSocialMediaList((prevList) => prevList.filter((_, i) => i !== index));
  };

  return (
    <>
      <h4 className="text-primary font-semibold mb-3 text-2xl">Add Personal Info</h4>
      <div className="w-full">
        <Label className="text-sm text-gray-600">Your Bio</Label>
        <textarea
          rows={3}
          className="w-full resize-none rounded-xl border-[2px] border-gray-200 p-2.5 transition-transform delay-75 duration-300 placeholder:text-sm focus:-translate-y-[2px]  hover:border-neutral-800  focus:outline-neutral-800"
          placeholder="Your Bio"
          {...register('bio', {
            required: true
          })}
        ></textarea>
        {errors.bio && <span className="text-sm text-red-500">Bio cannot be empty!</span>}
      </div>
      <TopicList maxTopics={4} topicsList={topics} onTopicsChange={handleTopicsChange} />
      <div className="w-full mt-3">
        <SocialMediaSelect onAddButton={handleAddButton} />
        <SocialMediaList items={socialMediaList} onDeleteSocialLink={deleteSocialLink} />
      </div>
    </>
  );
};

export default Influencer;
