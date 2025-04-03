import {BsBell } from "react-icons/bs";
import { HiOutlineMenu } from "react-icons/hi";
import { CiSearch } from "react-icons/ci";
import Link from 'next/link';
import Image from 'next/image';
import profileImage from '@/public/images/yotsuba.webp'
import { useContext } from 'react';
import { SidebarContext } from './SidebarContext';

const Navbar = () => {
  const { toggleSidebar } = useContext(SidebarContext); 

  return (
    <nav className="bg-background w-full z-50 top-0 flex items-center justify-between  px-4 py-3">
      <div className="flex items-center">
        <button 
          onClick={toggleSidebar}
          className="p-2 hover:bg-background rounded-full"
        >
          <HiOutlineMenu className="w-6 h-6 text-white" />
        </button>
        <Link href="/" className="flex items-center pl-4">
          {/* < className="text-red-600 w-6 h-6" /> */}
          
          <span className="ml-1 text-3xl pl-4 text-white font-serif max-lg:hidden">Hamkke</span>
        </Link>
      </div>
      <div className="flex items-center justify-center flex-grow max-w-[732px]">
  <div className="flex w-full max-w-[638px] items-center">
    <div className="flex flex-grow">
      <div className="relative flex-grow">
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#717171]">
          <CiSearch className="w-5 h-5" />
        </div>
        <input
          type="text"
          placeholder="Search"
          className="w-full px-4 py-2 pl-12 bg-[#141414] border border-[#303030] focus:border-blue-500 rounded-l-full text-white outline-none"
        />
      </div>
      <button className="px-6 py-2 border border-l-0 border-[#303030] rounded-r-full bg-[#272727]">
        <CiSearch className="w-5 h-5 text-white" />
      </button>
    </div>
  </div>
</div>

      <div className="flex items-center gap-3">

        <button className="p-2 hover:bg-[#272727] rounded-full">
          <BsBell className="w-6 h-6 text-white" />
        </button>
        <button className="w-8 h-8 rounded-full overflow-hidden relative">
          <Image 
            src={profileImage}
            alt="profile"
            fill
            className="object-cover"
          />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;