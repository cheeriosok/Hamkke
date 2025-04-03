"use client";

import React from 'react';
import LeftSidebar from '../components/LeftSidebar';
import MainComponent from '../components/MainComponent';
import Navbar from '@/components/Nav';
import { SidebarProvider } from '../components/SidebarContext';

export default function Layout() {
  return (
    <SidebarProvider>
      <div className="flex flex-col min-h-screen bg-background text-white">
        <Navbar />
        <div className="flex flex-1">
          <LeftSidebar />
          <MainComponent />
        </div>
      </div>
    </SidebarProvider>
  );
}