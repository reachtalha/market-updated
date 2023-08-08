'use client';
import React, { useState, useEffect } from 'react';

import { doc, updateDoc } from 'firebase/firestore';
import { db, auth } from '@/lib/firebase/client';

import SocialMediaList from '@/components/common/SocialMediaList';
import { Label } from '@/components/ui/label';
import SocialMediaSelect from '@/components/common/SocialMediaSelect';

import toast from 'react-hot-toast';

import { FormProvider, useForm, SubmitHandler } from 'react-hook-form';
import useAuth from '@/hooks/useAuth';
import TopicList from '@/components/modules/OnBoarding/Influencer/TopicList';
import { Button } from '@/components/ui/button';
import Title from '@/components/common/Seller/Shared/Title';

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

  function normalize(text: string) {
    return text.replace(/[\u2018\u2019\u201C\u201D]/g, "'");
  }

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      console.log(data);
      await updateDoc(doc(db, 'users', auth.currentUser?.uid as string), {
        bio: data?.bio,
        topics: data.topics,
        socialMediaLinks: data.socialMediaLinks
      });

      window.location.reload();
    } catch (e) {
      toast.error('Error while updating account');
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className={` py-10`}>
      <FormProvider {...methods}>
        <form id="edit-socials-form" onSubmit={handleSubmit(onSubmit)} className="">
          <Title title="Socials" />
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
          <Button className="w-full mt-4">Update</Button>
        </form>
      </FormProvider>
    </section>
  );
};

export default Index;
