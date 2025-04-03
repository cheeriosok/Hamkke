"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import ComposePostForm from './ComposePostForm';
import Post from './Post';
import { PostWithAuthor, Profile } from '../public/types';
import { useEffect } from 'react';
// Define our constants


export const mockUsers: Profile[] = [
  {
    id: '1',
    username: 'musiclover',
    fullName: 'Emma Carter',
    avatarUrl: '/images/1.png'
  },
  {
    id: '2',
    username: 'chefcook',
    fullName: 'Marcus Chen',
    avatarUrl: '/images/2.png'
  },
  {
    id: '3',
    username: 'artcurator',
    fullName: 'Sofia Rodriguez',
    avatarUrl: '/images/3.png'
  },
  {
    id: '4',
    username: 'jazzpianist',
    fullName: 'David Park',
    avatarUrl: '/images/4.png'
  },
  {
    id: '5',
    username: 'pastryartist',
    fullName: 'Claire Bennett',
    avatarUrl: '/images/5.png'
  },
  {
    id: '6',
    username: 'sculptor',
    fullName: 'Alex Kim',
    avatarUrl: '/images/6.png'
  },
  {
    id: '7',
    username: 'violinist',
    fullName: 'Maria Torres',
    avatarUrl: '/images/7.png'
  },
  {
    id: '8',
    username: 'souschef',
    fullName: 'Thomas Wright',
    avatarUrl: '/images/8.png'
  },
  {
    id: '9',
    username: 'painter',
    fullName: 'Luna Chang',
    avatarUrl: '/images/9.png'
  },
  {
    id: '10',
    username: 'composer',
    fullName: 'James Wilson',
    avatarUrl: '/images/10.png'
  },
  {
    id: '11',
    username: 'foodwriter',
    fullName: 'Nina Patel',
    avatarUrl: '/images/11.png'
  },
  {
    id: '12',
    username: 'curator',
    fullName: 'Leo Fischer',
    avatarUrl: '/images/12.png'
  }
];

export const mockPosts: PostWithAuthor[] = [
  {
    userProfile: mockUsers[0],
    PostDetails: {
      id: '1',
      text: 'Just finished listening to Mahlers Symphony No. 2 "Resurrection". The final movement still gives me chills every time! 🎵✨',
      createdAt: '2024-01-23T12:00:00Z',
      userId: '1'
    }
  },
  {
    userProfile: mockUsers[1],
    PostDetails: {
      id: '2',
      text: 'Experimented with fermented black garlic in my risotto today. The depth of flavor is incredible! 🧄 #CulinaryExperiments',
      createdAt: '2024-01-23T12:05:00Z',
      userId: '2'
    }
  },
  {
    userProfile: mockUsers[2],
    PostDetails: {
      id: '3',
      text: 'New Vermeer exhibition opening next week at the gallery. The light studies are absolutely breathtaking! 🎨',
      createdAt: '2024-01-23T12:10:00Z',
      userId: '3'
    }
  },
  {
    userProfile: mockUsers[3],
    PostDetails: {
      id: '4',
      text: 'Practicing Bill Evans\' Peace Piece\" for tomorrow\'s performance. Such a meditative experience 🎹',
      createdAt: '2024-01-23T12:15:00Z',
      userId: '4'
    }
  },
  {
    userProfile: mockUsers[4],
    PostDetails: {
      id: '5',
      text: 'Finally perfected my chocolate mirror glaze technique! The reflection is like glass ✨🍫',
      createdAt: '2024-01-23T12:20:00Z',
      userId: '5'
    }
  },
  {
    userProfile: mockUsers[5],
    PostDetails: {
      id: '6',
      text: 'Working on a new marble piece inspired by Berninis fluid forms. The stone is starting to speak 🗿',
      createdAt: '2024-01-23T12:25:00Z',
      userId: '6'
    }
  },
  {
    userProfile: mockUsers[6],
    PostDetails: {
      id: '7',
      text: 'Rehearsing Sibelius Violin Concerto with the orchestra today. The third movement is pure fire! 🎻',
      createdAt: '2024-01-23T12:30:00Z',
      userId: '7'
    }
  },
  {
    userProfile: mockUsers[7],
    PostDetails: {
      id: '8',
      text: 'Made my first batch of homemade koji for miso. Now the waiting game begins! 🍶 #Fermentation',
      createdAt: '2024-01-23T12:35:00Z',
      userId: '8'
    }
  },
  {
    userProfile: mockUsers[8],
    PostDetails: {
      id: '9',
      text: 'Exploring new techniques with watercolors today. The way light catches the pigments is pure magic 🎨',
      createdAt: '2024-01-23T12:40:00Z',
      userId: '9'
    }
  },
  {
    userProfile: mockUsers[9],
    PostDetails: {
      id: '10',
      text: 'Just completed the first movement of my new string quartet. Inspired by Debussy\'s harmonic language 📝',
      createdAt: '2024-01-23T12:45:00Z',
      userId: '10'
    }
  },
  {
    userProfile: mockUsers[10],
    PostDetails: {
      id: '11',
      text: 'Exploring traditional dumpling techniques across Asia for my next cookbook. The variations are fascinating! 📚🥟',
      createdAt: '2024-01-23T12:50:00Z',
      userId: '11'
    }
  },
  {
    userProfile: mockUsers[11],
    PostDetails: {
      id: '12',
      text: 'Just acquired a stunning piece from an emerging digital artist. The intersection of AI and traditional media is mind-blowing! 🖼️',
      createdAt: '2024-01-23T12:55:00Z',
      userId: '12'
    }
  }
];


export const getCurrentUser = () => mockUsers[2];

export const createNewPost = (text: string): PostWithAuthor => {
  const currentUser = getCurrentUser();
  return {
    userProfile: currentUser,
    PostDetails: {
      id: Date.now().toString(),
      text,
      createdAt: new Date().toISOString(),
      userId: currentUser.id
    }
  };
};

const getAvatarSrc = (avatarKey: string) => avatarKey;

const MainComponent = () => {
  // State management with consistent naming and proper initialization
  const [posts, setPosts] = useState<PostWithAuthor[]>(mockPosts);
  const [likes, setLikes] = useState<Record<string, boolean>>({});
  const [replies, setReplies] = useState<Record<string, number>>({});
  const [, setWindowWidth] = useState(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  // Get current user for the component
  const currentUser = getCurrentUser();

  // Handler functions for user interactions
  const handlePostSubmit = async (text: string) => {
    const newPost = createNewPost(text);
    setPosts([newPost, ...posts]);
  };

  const handleLike = async (postId: string) => {
    setLikes(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const handleReply = async (postId: string, replyText: string) => {
    // First update the reply count for the original post
    setReplies(prev => ({
      ...prev,
      [postId]: (prev[postId] || 0) + 1
    }));
    
    // Then create and add the reply post using our utility function
    const replyPost = createNewPost(replyText);
    setPosts([replyPost, ...posts]);
  };

  return (
      <main className="flex flex-col w-full h-full min-h-screen border-gray-600 px-4 box-border">
        <div className="px-4 border rounded-2xl flex items-stretch py-6 space-x-2 border-gray-600">
        <div className="relative flex-none w-12 h-12">
 <Image
   src={getAvatarSrc(currentUser.avatarUrl)}
   alt={`${currentUser.fullName}'s avatar`}
   fill
   className="rounded-full object-cover" 
 />
</div>
          <ComposePostForm onSubmit={handlePostSubmit} />
        </div>
    
        <div className="w-full mt-4">
  <div className="grid w-full grid-cols-1 gap-4 xl:grid-cols-2 4xl:grid-cols-3">
    {posts.map((post, index) => (
      <div 
        key={post.PostDetails.id}
        className={`
          ${posts.length % 3 === 1 && index === posts.length - 1 ? '4xl:col-span-3' : ''}
          ${posts.length % 3 === 2 && index >= posts.length - 2 ? '4xl:col-span-1.5' : ''}
          ${posts.length % 2 === 1 && index === posts.length - 1 ? 'xl:col-span-2' : ''}
        `}
      >
        <Post
          Post={post}
          likesCount={likes[post.PostDetails.id] ? 1 : 0}
          hasLiked={!!likes[post.PostDetails.id]}
          repliesCount={replies[post.PostDetails.id] || 0}
          onLike={handleLike}
          onReply={handleReply}
        />
      </div>
    ))}
  </div>
</div>
      </main>

  );
};

export default MainComponent;