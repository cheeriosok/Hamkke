
// ReplyDialog.tsx
"use client";

import React, { useState } from "react";
import { Dialog, DialogContent } from "./Dialog";
import { BsChat, BsDot, BsThreeDots } from "react-icons/bs";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { PostWithAuthor } from "@/public/types";

dayjs.extend(relativeTime);

type ReplyDialogProps = {
  Post: PostWithAuthor;
  repliesCount: number;
  onReply: (PostId: string, replyText: string) => Promise<void>;
};

const ReplyDialog = ({ Post, repliesCount, onReply }: ReplyDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [replyText, setReplyText] = useState("");

  const handleReply = async () => {
    if (!replyText.trim()) return;
    
    try {
      await onReply(Post.PostDetails.id, replyText);
      setIsOpen(false);
      setReplyText("");
    } catch (error) {
      console.error("Failed to reply:", error);
    }
  };

  const handleClose = () => setIsOpen(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <div>
        <button 
          onClick={() => setIsOpen(true)}
          className="rounded-full flex items-center space-x-2 transition duration-200 p-3 cursor-pointer hover:text-iconblue hover:bg-iconblue/10"
        >
          <BsChat />
          <span>{repliesCount}</span>
        </button>
      </div>
      {isOpen && (
        <DialogContent className="bg-black sm:max-w-2xl border-none text-white" onClose={handleClose}>
          <div className="border-b-[0.5px] border-gray-600 p-2 flex space-x-4 w-full">
            <div>
              <div className="w-10 h-10 bg-slate-200 rounded-full" />
            </div>
            <div className="flex flex-col w-full">
              <div className="flex items-center w-full justify-between">
                <div className="flex items-center space-x-1 w-full">
                  <div className="font-bold">{Post.userProfile.fullName ?? ""}</div>
                  <div className="text-gray-500">@{Post.userProfile.username}</div>
                  <div className="text-gray-500"><BsDot /></div>
                  <div className="text-gray-500">
                    {dayjs(Post.PostDetails.createdAt).fromNow()}
                  </div>
                </div>
                <div><BsThreeDots /></div>
              </div>
              <div className="text-white text-base w-full my-4">
                {Post.PostDetails.text}
              </div>
            </div>
          </div>
          <div>Replying to @{Post.userProfile.username}</div>
          <div className="flex w-full items-center space-x-2">
            <div>
              <div className="w-10 h-10 bg-slate-200 rounded-full" />
            </div>
            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              className="w-full h-full text-2xl placeholder:text-gray-600 bg-transparent border-b-[0.5px] border-gray-600 p-4 outline-none"
              placeholder="Post your reply"
            />
          </div>
          <div className="w-full justify-between items-center flex">
            <div></div>
            <div className="w-full max-w-[100px]">
              <button
                onClick={handleReply}
                disabled={!replyText.trim()}
                className="rounded-full bg-blue-500 px-4 py-2 w-full text-lg text-center hover:bg-opacity-70 transition duration-200 font-bold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Reply
              </button>
            </div>
          </div>
        </DialogContent>
      )}
    </Dialog>
  );
};

export default ReplyDialog;