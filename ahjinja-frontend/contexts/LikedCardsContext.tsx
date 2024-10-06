import React, { createContext, useState, useContext } from 'react';

const LikedCardsContext = createContext<any>(null);

export const LikedCardsProvider = ({ children }: { children: React.ReactNode }) => {
  const [likedCards, setLikedCards] = useState<{ [key: string]: boolean }>({});

  const handleLike = (id: string) => {
    setLikedCards((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  return (
    <LikedCardsContext.Provider value={{ likedCards, handleLike }}>
      {children}
    </LikedCardsContext.Provider>
  );
};
export const useLikedCards = () => {
  return useContext(LikedCardsContext);
};
