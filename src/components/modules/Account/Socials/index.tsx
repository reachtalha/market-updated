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
import { Pencil } from 'lucide-react';

type FormValues = {
  bio: string;
  topics: string[];
  socialMediaLinks: Array<any>;
};

interface SocialMedia {
  type: string;
  link: string;
}

const MAX_CHAR = 150;
const Index = ({ defaultValues }: { defaultValues: FormValues }) => {
  const { mutate } = useSWRConfig();
  const [loading, setLoading] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
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
    setValue,
    register,
    watch,
    getValues,
    setError,
    clearErrors,
    formState: { errors }
  } = methods;
  const bio = getValues('bio');
  const watchBio = watch(['bio']);

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

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      setLoading(true);
      await updateDoc(doc(db, 'users', auth.currentUser?.uid as string), {
        bio: data?.bio,
        topics: data.topics,
        socialMediaLinks: data.socialMediaLinks
      });
      mutate('currentUser');
      setIsEdit(false);
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
          <div className="flex items-center">
            <Title title="Socials" />
            {!isEdit && (
              <Pencil
                className="ms-auto cursor-pointer"
                size={18}
                onClick={() => setIsEdit(true)}
              />
            )}
          </div>
          <div className="w-full space-y-1">
            <Label>Your Bio</Label>
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
              disabled={!isEdit}
            />
            <div className="text-sm">
              {bio.length}/{MAX_CHAR} characters
            </div>
            {errors.bio && errors.bio.message && (
              <span className="text-sm text-red-500">{errors.bio.message}</span>
            )}
          </div>
          <TopicList
            isEdit={isEdit}
            maxTopics={4}
            topicsList={topics}
            onTopicsChange={handleTopicsChange}
          />
          <div className="w-full mt-3">
            <SocialMediaSelect isEdit={isEdit} onAddButton={handleAddButton} />
            <SocialMediaList
              isEdit={isEdit}
              items={socialMediaList}
              onDeleteSocialLink={deleteSocialLink}
            />
          </div>
          <Button disabled={loading || !isEdit} className="w-full mt-4">
            {loading ? 'Updating...' : 'Update'}
          </Button>
        </form>
      </FormProvider>
    </section>
  );
};

export default Index;
