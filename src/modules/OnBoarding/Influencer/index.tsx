import { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { Cross1Icon, PlusIcon } from "@radix-ui/react-icons";

import TopicList from "./TopicList";

interface SocialMedia {
  type: string;
  link: string;
}

const Influencer = () => {
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext();

  const [socialMediaList, setSocialMediaList] = useState<SocialMedia[]>([]);
  const [topics, setTopics] = useState<string[]>([]);

  useEffect(() => {
    setValue("socialLink", socialMediaList);
  }, [socialMediaList]);

  const handleTopicsChange = (updatedTopics: string[]) => {
    setTopics(updatedTopics);
    setValue("topics", topics);
  };

  const handleAddButton = (selectedSocialMedia: string, link: string) => {
    setSocialMediaList([
      ...socialMediaList,
      {
        type: selectedSocialMedia,
        link: link,
      },
    ]);
  };

  const deleteSocialLink = (index: number) => {
    setSocialMediaList((prevList) => prevList.filter((_, i) => i !== index));
  };

  return (
    <>
      <h4 className="text-primary font-semibold mb-3 text-2xl">
        Add Personal Info
      </h4>
      <div className="w-full">
        <label className="text-sm text-gray-600">Your Bio</label>
        <textarea
          rows={3}
          className="w-full resize-none rounded-xl border-[2px] border-gray-200 p-2.5 transition-transform delay-75 duration-300 placeholder:text-sm focus:-translate-y-[2px]  hover:border-neutral-800  focus:outline-neutral-800"
          placeholder="Your Bio"
          {...register("bio", {
            required: true,
          })}
        ></textarea>
        {errors.bio && (
          <span className="text-sm text-red-500">Bio cannot be empty!</span>
        )}
      </div>
      <TopicList
        maxTopics={4}
        topicsList={topics}
        onTopicsChange={handleTopicsChange}
      />
      <div className="w-full mt-3">
        <SocialMediaSelect onAddButton={handleAddButton} />
        <SocialMediaList
          items={socialMediaList}
          onDeleteSocialLink={deleteSocialLink}
        />
      </div>
    </>
  );
};

export default Influencer;

interface SocialMediaSelectProps {
  onAddButton: (selectedSocialMedia: string, link: string) => void;
}

const SocialMediaSelect: React.FC<SocialMediaSelectProps> = ({
  onAddButton,
}) => {
  const [selectedSocialMedia, setSelectedSocialMedia] = useState("");
  const [link, setLink] = useState("");
  const options = [
    "Facebook",
    "Instagram",
    "TikTok",
    "Twitter",
    "YouTube",
    "Website",
  ];

  const handleSocialMediaChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
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
    setSelectedSocialMedia("");
    setLink("");
  };

  return (
    <>
      <label htmlFor="socialMedia" className="text-sm text-gray-600">
        Social Media
      </label>
      <div className="w-full flex rounded-xl overflow-hidden p-1 border-[2px] border-gray-200 transition-transform delay-75 duration-300 placeholder:text-sm hover:border-neutral-800  focus-within:outline-neutral-800">
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

        <input
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
          className="bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-50 hover:bg-neutral-900 rounded-lg px-2 py-1.5"
          onClick={handleAddClick}
        >
          <PlusIcon className="w-5 h-5 text-white" />
        </button>
      </div>
    </>
  );
};

interface SocialMediaListProps {
  items: SocialMedia[];
  onDeleteSocialLink: (index: number) => void;
}

const SocialMediaList: React.FC<SocialMediaListProps> = ({
  items,
  onDeleteSocialLink,
}) => {
  return (
    <div className="mt-2">
      <h6 className="text-sm text-gray-600">Social Media Links:</h6>
      {items.length === 0 ? (
        <p className="text-sm text-center py-6 text-gray-600">
          No social media links added yet.
        </p>
      ) : (
        <ul className="space-y-1 mt-2">
          {items.map((socialMedia: SocialMedia, index: number) => (
            <li
              key={index}
              className="flex justify-between items-center gap-x-2"
            >
              <p>
                <span className="font-medium">{socialMedia.type}</span>:
                {socialMedia.link}
              </p>
              <button
                onClick={() => onDeleteSocialLink(index)}
                className="hover:bg-gray-100 rounded-full p-1"
              >
                <Cross1Icon className="w-5 h-5" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
