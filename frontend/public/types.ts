export type Profile = {
    id: string;
    username: string;
    fullName: string;
    avatarUrl: string;
  };
  
  export type Post = {
    id: string;
    text: string;
    createdAt: string;
    userId: string;
  };
  
  export type PostWithAuthor = {
    userProfile: Profile;
    PostDetails: Post;
  };
  
  export interface PostProps {
    Post: PostWithAuthor;
    likesCount: number;
    hasLiked: boolean;
    repliesCount: number;
    onLike: (postId: string) => Promise<void>;
    onReply: (postId: string, replyText: string) => Promise<void>;
  }

  export interface UserData {
    uid: string;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
  }