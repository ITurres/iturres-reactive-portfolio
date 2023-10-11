import React, { useState, useRef, useEffect } from 'react';

import { SlLike } from 'react-icons/sl';

import '../../styles/UI/LikeButton.scss';

import involvement from '../../services/involvementAPI/involvementAPI.ts';

/* eslint-disable no-undef */
interface LikeButtonProps {
  itemId: string;
}

const LikeButton: React.FC<LikeButtonProps> = ({ itemId }) => {
  const [wasLiked, setWasLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [error, setError] = useState(false);

  const likeBtn = useRef<HTMLButtonElement>(null);

  const styleButton = () => {
    if (wasLiked) {
      likeBtn.current?.classList.toggle('liked');
    }
  };

  useEffect(() => {
    if (wasLiked) {
      styleButton();
    }
  }, [wasLiked]);

  interface Like {
    // * disable camelcase since 'item_id' is the name of the property in the API response.
    // eslint-disable-next-line camelcase
    item_id: string;
    likes: number;
  }

  const updateLikeCount = async () => {
    const likes: Like[] = (await involvement.getLikes()) as Like[];

    const likedProject = likes.find((like) => like.item_id === itemId);

    if (likedProject) {
      setLikeCount(likedProject.likes);
    }
  };

  useEffect(() => {
    updateLikeCount();
  }, [itemId]);

  const handleLikeSubmit = async () => {
    setWasLiked((liked) => !liked);

    // * shows an instant update of the like count.
    if (!wasLiked) {
      setLikeCount((count) => count + 1);
    }

    const likePosted = await involvement.postLike(itemId);

    if (likePosted === 'error') {
      setError(true);
    }

    // * after posting a like, update the like count.
    updateLikeCount();
  };

  return (
    <button
      type="button"
      className="like-button text-hue-rotate"
      ref={likeBtn}
      onClick={handleLikeSubmit}
    >
      <SlLike size={20} className="like-icon" />

      {likeCount > 0 && (
        <span className="like-button__text">
          &nbsp;
          {!error ? likeCount : 'Error'}
        </span>
      )}
    </button>
  );
};

export default LikeButton;
