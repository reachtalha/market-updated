import { useState, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { Label } from '@/components/ui/label';

import { Textarea } from '@/components/ui/textarea';
import SocialMediaSelect from '@/components/common/SocialMediaSelect';
import SocialMediaList from '@/components/common/SocialMediaList';
import TopicList from './TopicList';

interface SocialMedia {
  type: string;
  link: string;
}

const MAX_CHAR = 150;
const Influencer = () => {
  const {
    setValue,
    register,
    watch,
    getValues,
    setError,
    clearErrors,
    formState: { errors }
  } = useFormContext();


  const [socialMediaList, setSocialMediaList] = useState<SocialMedia[]>([]);
  const [topics, setTopics] = useState<string[]>([]);

  const bio = getValues("bio");
  const watchBio = watch(["bio"]);

  useEffect(() => {
    const bioError = errors.bio;

    if (bio.length > MAX_CHAR && !bioError) {
      setError('bio', {
        type: 'maxLength',
        message: `Max length should be ${MAX_CHAR} characters`
      });
    } else if (bio.length <= MAX_CHAR && bioError?.type === 'maxLength') {
      clearErrors('bio');
    }
  }, [watchBio, getValues, setError, clearErrors, errors.bio]);

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
        <Textarea
          rows={3}
          className="w-full resize-none placeholder:text-sm"
          placeholder="Your Bio"
          {...register('bio', {
            required: true,
            maxLength: {
              value: MAX_CHAR,
              message: `Max length should be ${MAX_CHAR} characters`
            }
          })}
        />
        <div className="text-sm">
          {bio.length}/{MAX_CHAR} characters
        </div>
        {errors.bio && errors.bio.message && (
          <span className="text-sm text-red-500">{errors.bio.message.toString()}</span>
        )}
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
