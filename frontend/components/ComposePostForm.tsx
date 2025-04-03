"use client";

import React, { useRef } from "react";

type ComposePostFormProps = {
  onSubmit: (text: string) => Promise<void>;
};

const ComposePostForm = ({ onSubmit }: ComposePostFormProps) => {
  const resetRef = useRef<HTMLButtonElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const text = formData.get("Post") as string;
    
    try {
      await onSubmit(text);
      resetRef.current?.click();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-full h-full">
      <input
        type="text"
        name="Post"
        className="w-full h-full text-2xl placeholder:text-gray-600 bg-transparent border-b-[0.5px] border-gray-600 p-4 outline-none border-none"
        placeholder="What's happening?"
      />
      <div className="w-full justify-between items-center flex">
        <div></div>
        <div className="w-full max-w-[100px]">
          <button
            type="submit"
            className="rounded-full bg-[#360808] px-4 py-2 w-full text-lg text-center hover:bg-opacity-70 transition duration-200 font-bold"
          >
            Post
          </button>
          <button ref={resetRef} className="invisible" type="reset"></button>
        </div>
      </div>
    </form>
  );
};

export default ComposePostForm;