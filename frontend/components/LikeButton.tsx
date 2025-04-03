"use client";

import React from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

type LikeButtonProps = {
  PostId: string;
  likesCount: number;
  isLiked: boolean;
  onLike: (PostId: string) => Promise<void>;
};

const LikeButton = ({ PostId, likesCount, isLiked, onLike }: LikeButtonProps) => {
  return (
    <button
      onClick={() => onLike(PostId)}
      className="rounded-full flex items-center space-x-2 transition duration-200 p-3 cursor-pointer hover:text-iconpink hover:bg-iconpink/10"
    >
      {isLiked ? (
        <AiFillHeart className="w-5 h-5 text-red-600" />
      ) : (
        <AiOutlineHeart className="w-5 h-5" />
      )}
      <span>{likesCount}</span>
    </button>
  );
};

export default LikeButton;