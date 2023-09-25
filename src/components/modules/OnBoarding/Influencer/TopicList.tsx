import React, { useState, useRef } from 'react';
import toast from 'react-hot-toast';
import { Cross1Icon } from '@radix-ui/react-icons';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useFormContext } from 'react-hook-form';
interface TopicListProps {
  maxTopics: number;
  topicsList: string[];
  onTopicsChange: (topics: string[]) => void;
  isEdit?: boolean;
}

const topics = ['Health', 'Skincare', 'Supplements', 'Food', 'Fashion'];

const TopicList: React.FC<TopicListProps> = ({
  maxTopics,
  topicsList,
  onTopicsChange,
  isEdit = true
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const {
    formState: { errors }
  } = useFormContext();
  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      addTopic();
    }
  };

  const addTopic = () => {
    const currentTopic = inputRef.current!.value;
    if (currentTopic.trim() === '') {
      toast.error('Please enter a topic!');
      return;
    }
    if (!topics.includes(currentTopic)) {
      toast.error('Please select from available topics!');
      return;
    }
    if (topicsList.includes(currentTopic)) {
      toast.error('Topic is already added!');
      return;
    }

    if (topicsList.length >= maxTopics) {
      toast.error(`Maximum topics limit (${maxTopics}) reached!`);
      return;
    }

    const updatedTopics = [...topicsList, currentTopic];
    onTopicsChange(updatedTopics);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const removeTopic = (topic: string) => {
    const updatedTopics = topicsList.filter((t) => t !== topic);
    onTopicsChange(updatedTopics);
  };

  return (
    <div className="flex space-y-1 flex-col">
      <Label htmlFor="topicInput">Add Topics</Label>
      <div className="w-full flex rounded-md overflow-hidden p-1 border-[1px] border-neutral-200 placeholder:text-sm focus-within:ring-0 focus-within:ring-neutral-400 focus-within:ring-offset-0">
        {topicsList.map((topic, index) => (
          <span
            key={index}
            className="w-fit inline-flex items-center gap-x-1 px-2.5 text-sm py-1 mr-1 rounded-lg border bg-neutral-100"
          >
            {topic}
            <button
              disabled={!isEdit}
              onClick={() => removeTopic(topic)}
              className={`${
                isEdit ? 'hover:bg-neutral-200 ' : 'cursor-not-allowed'
              } rounded-full p-0.5`}
            >
              <Cross1Icon className="w-4 h-4" />
            </button>
          </span>
        ))}
        <div>
          <Input
            id="topicInput"
            type="text"
            list="topicsList"
            ref={inputRef}
            disabled={!isEdit}
            placeholder="Add Topics"
            onKeyDown={handleInputKeyDown}
            className="w-full bg-none px-2 py-1 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
          <datalist id="topicsList" className="appearance-none">
            {topics.map((t: string) => (
              <option value={t} key={t} />
            ))}
          </datalist>
        </div>
      </div>
      {errors.topics && <span className="text-red-500 text-sm font-semibold">Required</span>}
    </div>
  );
};

export default TopicList;
