"use client";

import Link from "next/link";
import { BiHomeCircle } from "react-icons/bi";
import { BsHandThumbsUp, BsSignpostSplit, BsBookmark } from "react-icons/bs";
import { MdOutlineVideoLibrary, MdOutlineFeedback } from "react-icons/md";
import {RiHistoryLine } from "react-icons/ri";
import { MdOutlineGroups, MdOutlineGroupAdd } from "react-icons/md";
import { AiOutlineShopping, AiOutlineFire, AiOutlineRetweet } from "react-icons/ai";
import { IoGameControllerOutline, IoNewspaperOutline } from "react-icons/io5";
import { PiMusicNote, PiTelevisionSimple } from "react-icons/pi";
import { SlUserFollowing } from "react-icons/sl";
import { IoHelpCircleOutline } from "react-icons/io5";
import { FiSettings } from "react-icons/fi";
import { SlArrowDown } from "react-icons/sl";
import { useContext } from 'react';
import { SidebarContext } from './SidebarContext';

// Main navigation items at the top
const NAVIGATION_ITEMS = [
  {
    title: "Home",
    icon: BiHomeCircle,
  },
  {
    title: "For You",
    icon: AiOutlineRetweet,
  },
  {
    title: "Following",
    icon: SlUserFollowing,
  },
];

// User content section items
const USER_ITEMS = [
  {
    title: "History",
    icon: RiHistoryLine,
  },
  {
    title: "Liked Posts",
    icon: BsHandThumbsUp,
  },
  {
    title: "Your Posts",
    icon: BsSignpostSplit,
  },
  {
    title: "Groups",
    icon: MdOutlineGroups,
  },
  {
    title: "Create a Group",
    icon: MdOutlineGroupAdd,
  },
  {
    title: "Favorites",
    icon: BsBookmark,
  },

];

// Subscribed channels
const SUBSCRIPTIONS = [
  { name: "100 Days of Practice", isLive: true },
  { name: "Sichuan Cooking", isLive: false },
  { name: "LearnPiano", isLive: true },
  { name: "Lifting101", isLive: false },
  { name: "The Test Kitchen", isLive: true },
  { name: "MidoriTravel ", isLive: false },
];

// Explore section items
const EXPLORE_ITEMS = [
  {
    title: "Trending",
    icon: AiOutlineFire,
  },
  {
    title: "Shopping",
    icon: AiOutlineShopping,
  },
  {
    title: "Music",
    icon: PiMusicNote,
  },
  {
    title: "Movies & TV",
    icon: PiTelevisionSimple,
  },
  {
    title: "Live",
    icon: MdOutlineVideoLibrary,
  },
  {
    title: "Gaming",
    icon: IoGameControllerOutline,
  },
  {
    title: "News",
    icon: IoNewspaperOutline,
  },
];

const PERSONAL = [
  {
    title: "Settings",
    icon: FiSettings,
  },
  {
    title: "Get Help",
    icon: IoHelpCircleOutline,
  },
  {
    title: "Send Feedback",
    icon: MdOutlineFeedback,
  },
];

const LeftSidebar = () => {
  const { showSidebar } = useContext(SidebarContext);
  
  if (!showSidebar) return null;
  return (
  <section className="w-[240px] px-3 sticky top-0 flex-shrink-0 max-md:hidden lg:flex flex-col h-screen overflow-y-auto overflow-x-hidden bg-background text-gray-200 box-border">
    {/* Main Navigation */}
    <div className="flex flex-col items-start w-full border-b border-gray-700 pb-3">
      {NAVIGATION_ITEMS.map((item) => (
        <Link
          className="hover:bg-white/10 transition duration-200 flex items-center w-full justify-start space-x-6 rounded-xl px-3 py-2"
          href={item.title.toLowerCase() === "home" ? "/" : `/${item.title.toLowerCase()}`}
          key={item.title}
        >
          <div className="text-xl">
            <item.icon />
          </div>
          <div className="text-sm">{item.title}</div>
        </Link>
      ))}
    </div>
  
    {/* User Content Section */}
    <div className="flex flex-col items-start w-full border-b border-gray-700 py-3">
      {USER_ITEMS.map((item) => (
        <Link
          className="hover:bg-white/10 transition duration-200 flex items-center w-full justify-start space-x-6 rounded-xl px-3 py-2"
          href={`/${item.title.toLowerCase().replace(/\s+/g, '-')}`}
          key={item.title}
        >
          <div className="text-xl">
            <item.icon />
          </div>
          <div className="text-sm">{item.title}</div>
        </Link>
      ))}
    </div>
  
    {/* Subscriptions Section */}
    <div className="flex flex-col items-start w-full border-b border-gray-700 py-3">
      <h3 className="px-3 py-2 text-base font-medium">Subscriptions</h3>
      {SUBSCRIPTIONS.map((sub, index) => (
        <Link
          className="hover:bg-white/10 transition duration-200 flex items-center w-full justify-between rounded-xl px-3 py-2"
          href={`/c/${sub.name.toLowerCase().replace(/\s+/g, '-')}`}
          key={index}
        >
          <div className="flex items-center space-x-6">
            <div className="w-6 h-6 rounded-full bg-gray-600"></div>
            <div className="text-sm">
              {sub.name.length > 18 ? `${sub.name.substring(0, 18)}…` : sub.name}
            </div>
          </div>
          {sub.isLive && <div className="w-1 h-1 rounded-full bg-red-500"></div>}
        </Link>
      ))}
      <div className="flex space-x-7 w-full rounded-xl items-start py-2 ml-4 text-gray-300">
        <div className="text-md font-light">
          <SlArrowDown />
        </div>
        <div className="text-sm">Show More</div>
      </div>
    </div>

  
    {/* Explore Section */}
    <div className="flex flex-col items-start w-full py-3 border-b border-gray-700">
      <h3 className="px-3 py-2 text-base font-medium">Explore</h3>
      {EXPLORE_ITEMS.map((item) => (
        <Link
          className="hover:bg-white/10 transition duration-200 flex items-center w-full justify-start space-x-6 rounded-xl px-3 py-2"
          href={`/${item.title.toLowerCase().replace(/\s+/g, '-')}`}
          key={item.title}
        >
          <div className="text-xl">
            <item.icon />
          </div>
          <div className="text-sm">{item.title}</div>
        </Link>
      ))}
    </div>
  
    {/* Settings and Help */}
    <div className="flex flex-col items-start w-full py-3">
      <h3 className="px-3 py-2 text-base font-medium">More</h3>
      {PERSONAL.map((item) => (
        <Link
          className="hover:bg-white/10 transition duration-200 flex items-center w-full justify-start space-x-6 rounded-xl px-3 py-2"
          href={item.title.toLowerCase() === "home" ? "/" : `/${item.title.toLowerCase()}`}
          key={item.title}
        >
          <div className="text-xl">
            <item.icon />
          </div>
          <div className="text-sm">{item.title}</div>
        </Link>
      ))}
    </div>
  </section>  
  );
};

export default LeftSidebar;