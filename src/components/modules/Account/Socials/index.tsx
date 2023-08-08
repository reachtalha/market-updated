'use client';
import React, { useState, useEffect } from 'react';

import { useSWRConfig } from 'swr';

import { doc, updateDoc } from 'firebase/firestore';
import { db, auth } from '@/lib/firebase/client';

import SocialMediaList from '@/components/common/SocialMediaList';
import { Label } from '@/components/ui/label';
import SocialMediaSelect from '@/components/common/SocialMediaSelect';

import toast from 'react-hot-toast';

import { FormProvider, useForm, SubmitHandler } from 'react-hook-form';
import TopicList from '@/components/modules/OnBoarding/Influencer/TopicList';
import { Button } from '@/components/ui/button';
import Title from '@/components/common/Seller/Shared/Title';
import { Textarea } from '@/components/ui/textarea';

type FormValues = {
  bio: string;
  topics: string[];
  socialMediaLinks: Array<any>;
};

interface SocialMedia {
  type: string;
  link: string;
}

const Index = ({ defaultValues }: { defaultValues: FormValues }) => {
  const { mutate } = useSWRConfig();
  const [loading, setLoading] = useState<boolean>(false);
  const [socialMediaList, setSocialMediaList] = useState<SocialMedia[]>(
    defaultValues.socialMediaLinks
  );
  const [topics, setTopics] = useState<string[]>(defaultValues.topics);
  const methods = useForm<FormValues>({
    defaultValues,
    shouldUnregister: false
  });
  const {
    handleSubmit,
    reset,
    setValue,
    register,
    formState: { errors }
  } = methods;

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

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      setLoading(true);
      await updateDoc(doc(db, 'users', auth.currentUser?.uid as string), {
        bio: data?.bio,
        topics: data.topics,
        socialMediaLinks: data.socialMediaLinks
      });
      mutate('currentUser');
    } catch (e) {
      toast.error('Error while updating account');
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className={` py-10`}>
      <FormProvider {...methods}>
        <form id="edit-socials-form" onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <Title title="Socials" />
          <div className="w-full space-y-1">
            <Label>Your Bio</Label>
            <Textarea
              rows={3}
              className="w-full resize-none placeholder:text-sm transition-transform duration-300 border-neutral-200 delay-75 focus-visible:ring-0 focus-within:-translate-y-[2px] focus-within:ring-neutral-400 focus-visible:ring-offset-0"
              placeholder="Your Bio"
              {...register('bio', {
                required: true
              })}
            />
            {errors.bio && <span className="text-sm text-red-500">Bio cannot be empty!</span>}
          </div>
          <TopicList maxTopics={4} topicsList={topics} onTopicsChange={handleTopicsChange} />
          <div className="w-full mt-3 space-y-2">
            <SocialMediaSelect onAddButton={handleAddButton} />
            <SocialMediaList items={socialMediaList} onDeleteSocialLink={deleteSocialLink} />
          </div>
          <Button disabled={loading} className="w-full mt-4">
            {loading ? 'Updating...' : 'Update'}
          </Button>
        </form>
      </FormProvider>
    </section>
  );
};

export default Index;
