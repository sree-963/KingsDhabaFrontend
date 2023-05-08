import { useState, createContext } from "react";
// import { userContext } from 'react-router-dom';

export const SideBarContext = createContext();

const SidebarContext = ({ children }) => {
  const [Close, setClose] = useState(true);
  // const [activeTab, setActiveTab] = useState(1);

  const handleSidebarView = () => {
    setClose(!Close);
  };

  return (
    <>
      <SideBarContext.Provider value={{Close,handleSidebarView}}>
        {children}
      </SideBarContext.Provider>
    </>
  );
};

export default SidebarContext;
