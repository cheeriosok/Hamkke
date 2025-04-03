import { createContext, useState } from 'react';

type SidebarContextType = {
  showSidebar: boolean;
  toggleSidebar: () => void;
};

export const SidebarContext = createContext<SidebarContextType>({
  showSidebar: true,
  toggleSidebar: () => {},
});

export const SidebarProvider = ({ children }: { children: React.ReactNode }) => {
  const [showSidebar, setShowSidebar] = useState(true);
  const toggleSidebar = () => setShowSidebar(!showSidebar);

  return (
    <SidebarContext.Provider value={{ showSidebar, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};