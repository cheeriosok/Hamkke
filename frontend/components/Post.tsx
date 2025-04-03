import { BsDot, BsThreeDots } from "react-icons/bs";
import { AiOutlineRetweet } from "react-icons/ai";
import { IoShareOutline, IoStatsChart } from "react-icons/io5";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import LikeButton from "./LikeButton";
import ReplyDialog from "./ReplyDialog";
import ProfileAvatar from "./ProfileAvatar";
import { useRouter } from "next/navigation";
import { PostProps } from '@/public/types';

dayjs.extend(relativeTime);

const Post = ({
  Post,
  likesCount,
  hasLiked,
  repliesCount,
  onLike,
  onReply
}: PostProps) => {
  const router = useRouter();

  return (
    <div className="border-[0.5px] rounded-2xl border-gray-600 flex space-x-4 h-full w-full pl-3 pr-3 pt-3 hover:bg-[#1c1c1c]">
      <div className="flex-none">
        <ProfileAvatar
          username={Post.userProfile.username}
          avatarUrl={Post.userProfile.avatarUrl}
          isOnTimeline={true}
        />
      </div>
      <div className="flex flex-col flex-1 min-w-0">
        <div className="flex items-center">
          <div className="flex items-center space-x-1 min-w-0 flex-1">
            <div className="font-bold truncate">
              {Post.userProfile.fullName ?? ""}
            </div>
            <div className="text-gray-500 truncate">@{Post.userProfile.username}</div>
            <div className="text-gray-500 flex-none">
              <BsDot />
            </div>
            <div className="text-gray-500 truncate">
              {dayjs(Post.PostDetails.createdAt).fromNow()}
            </div>
          </div>
          <div className="flex-none">
            <BsThreeDots />
          </div>
        </div>

        <div
          onClick={() => router.push(`/Post/${Post.PostDetails.id}`)}
          className="text-white text-base w-full cursor-pointer transition-all"
        >
          {Post.PostDetails.text}
        </div>

        <div className="flex items-center justify-between mt-2 w-full text-gray-400">
  <ReplyDialog 
    Post={Post} 
    repliesCount={repliesCount}
    onReply={onReply}
  />
  <div className="rounded-full transition duration-200 p-2 md:p-3 cursor-pointer hover:text-icongreen hover:bg-icongreen/10">
    <AiOutlineRetweet className="w-5 h-5" />
  </div>
  <LikeButton
    PostId={Post.PostDetails.id}
    likesCount={likesCount}
    isLiked={hasLiked}
    onLike={onLike}
  />
  <div className="rounded-full transition duration-200 p-2 md:p-3 cursor-pointer hover:text-iconblue hover:bg-iconblue/10">
    <IoStatsChart className="w-5 h-5" />
  </div>
  <div className="rounded-full transition duration-200 p-2 md:p-3 cursor-pointer hover:text-iconblue hover:bg-iconblue/10">
    <IoShareOutline className="w-5 h-5" />
  </div>
</div>
      </div>
    </div>
  );
};

export default Post;