"use client";

import React, { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./Avatar";

type ProfileAvatarProps = {
  username?: string;
  avatarUrl: string | null;
  isOnTimeline?: boolean;
  onAvatarChange?: (file: File) => Promise<void>;
};

const ProfileAvatar = ({
  username,
  avatarUrl,
  isOnTimeline = false,
  onAvatarChange
}: ProfileAvatarProps) => {
  const [previewUrl, setPreviewUrl] = useState("");

  const handleFileChange = async (file: File | null) => {
    if (file && onAvatarChange) {
      setPreviewUrl(URL.createObjectURL(file));
      await onAvatarChange(file);
    }
  };

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <div>
      <div className="relative w-fit">
        {!isOnTimeline && onAvatarChange && (
          <input
            type="file"
            name="user-avatar"
            id="user-avatar"
            className="invisible absolute"
            accept="image/jpeg,image/png,image/jpg,image/gif"
            onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
          />
        )}
        <label
          htmlFor={isOnTimeline ? undefined : "user-avatar"}
          className={!isOnTimeline ? "cursor-pointer" : ""}
        >
          <Avatar>
            <AvatarImage
              src={previewUrl || avatarUrl || ""}
              alt={`@${username}`}
              className="object-cover bg-center"
            />
            <AvatarFallback>
              {username
                ? `${username[0]} ${username[username.length - 1]}`
                : ""}
            </AvatarFallback>
          </Avatar>
        </label>
      </div>
    </div>
  );
};

export default ProfileAvatar;