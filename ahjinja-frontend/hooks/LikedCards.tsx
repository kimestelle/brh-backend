import { useState } from 'react';

export default function useLikedCards() {
  const [likedCards, setLikedCards] = useState<{ [key: string]: boolean }>({});

  const handleLike = (id: string) => {
    setLikedCards((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  return { likedCards, handleLike };
}
