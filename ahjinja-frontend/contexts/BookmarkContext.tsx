import React, { createContext, useState, useContext } from 'react';

const BookmarkContext = createContext<any>(null);

export const BookmarkProvider = ({ children }: { children: React.ReactNode }) => {
  const [bookmarkedItems, setBookmarkedItems] = useState<{ [key: string]: boolean }>({});

  const handleBookmark = (id: string) => {
    setBookmarkedItems((prevState) => ({
      ...prevState,
      [id]: prevState[id] ? false : true,
    }));
  };

  return (
    <BookmarkContext.Provider value={{ bookmarkedItems, handleBookmark }}>
      {children}
    </BookmarkContext.Provider>
  );
};
export const useBookmark = () => {
  return useContext(BookmarkContext);
};
