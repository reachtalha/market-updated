import React, { useState, useRef } from "react";
import toast from "react-hot-toast";
import { Cross1Icon } from "@radix-ui/react-icons";

interface TopicListProps {
  maxTopics: number;
  topicsList: string[];
  onTopicsChange: (topics: string[]) => void;
}

const TopicList: React.FC<TopicListProps> = ({
  maxTopics,
  topicsList,
  onTopicsChange,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addTopic();
    }
  };

  const addTopic = () => {
    const currentTopic = inputRef.current!.value;
    if (currentTopic.trim() === "") {
      toast.error("Please enter a topic!");
      return;
    }

    if (topicsList.includes(currentTopic)) {
      toast.error("Topic is already added!");
      return;
    }

    if (topicsList.length >= maxTopics) {
      toast.error(`Maximum topics limit (${maxTopics}) reached!`);
      return;
    }

    const updatedTopics = [...topicsList, currentTopic];
    onTopicsChange(updatedTopics);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const removeTopic = (topic: string) => {
    const updatedTopics = topicsList.filter((t) => t !== topic);
    onTopicsChange(updatedTopics);
  };

  return (
    <>
      <label htmlFor="topicInput" className="text-sm text-gray-600">
        Add Topics
      </label>
      <div className="w-full flex rounded-xl overflow-hidden p-1 border-[2px] border-gray-200 transition-transform delay-75 duration-300 placeholder:text-sm hover:border-neutral-800  focus-within:outline-neutral-800">
        {topicsList.map((topic, index) => (
          <span
            key={index}
            className="w-fit inline-flex items-center gap-x-1 px-2.5 text-sm py-1 mr-1 rounded-xl border bg-gray-100"
          >
            {topic}
            <button
              onClick={() => removeTopic(topic)}
              className="hover:bg-gray-200 rounded-full p-0.5"
            >
              <Cross1Icon className="w-4 h-4" />
            </button>
          </span>
        ))}
        <div>
          <input
            id="topicInput"
            type="text"
            list="topicsList"
            ref={inputRef}
            placeholder="Add Topics"
            onKeyDown={handleInputKeyDown}
            className="focus:outline-none w-full bg-none px-2 py-1"
          />
          <datalist id="topicsList" className="appearance-none">
            <option value="Health" />
            <option value="Skincare" />
            <option value="Supplements" />
            <option value="Food" />
            <option value="Fashion" />
          </datalist>
        </div>
      </div>
    </>
  );
};

export default TopicList;
