import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
} from 'react';

import { SlLike } from 'react-icons/sl';
import { VscLoading } from 'react-icons/vsc';

import '../../styles/UI/LikeButton.scss';

import involvement from '../../services/involvementAPI/involvementAPI.ts';

interface LikeButtonProps {
  itemId: string;
}

const LikeButton: React.FC<LikeButtonProps> = ({ itemId }) => {
  const [wasLiked, setWasLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const maximumLoadingTime = 5000;

  const likeBtn = useRef<HTMLButtonElement>(null);

  const styleButton = useCallback(() => {
    if (wasLiked) {
      likeBtn.current?.classList.toggle('liked');
    }
  }, [wasLiked]);

  useEffect(() => {
    if (wasLiked) {
      styleButton();
    }
  }, [wasLiked, styleButton]);

  // ! terminate the loading state after a certain time.
  // ? this is to prevent the loading state from being stuck.
  // * and show the user the like button again.
  const setLoadingToFalse = useCallback(() => {
    setTimeout(() => {
      setLoading(false);
    }, maximumLoadingTime);
  }, []);

  interface Like {
    // * disable camelcase since 'item_id' is the name of the property in the API response.
    // eslint-disable-next-line camelcase
    item_id: string;
    likes: number;
  }

  const updateLikeCount = useCallback(async () => {
    const likes: Like[] = (await involvement.getLikes()) as Like[];

    if (likes.length === 0) {
      setError(true);
      // ? at this point the loading spinner is still showing.
      // * so terminate the loading state, to show the error message.
      setLoadingToFalse();
      return;
    }

    const likedProject = likes.find((like) => like.item_id === itemId);

    if (likedProject) {
      setLikeCount(likedProject.likes);
      setLoadingToFalse();
    }
  }, [itemId, setLoadingToFalse]);

  useEffect(() => {
    updateLikeCount();
  }, [itemId, updateLikeCount]);

  const handleLikeSubmit = async () => {
    setWasLiked((liked) => !liked);

    // * shows an instant update of the like count.
    if (!wasLiked) {
      setLikeCount((count) => count + 1);
    }

    if (error) {
      // ? at this point, there was an error already, so user will attempt to like again.
      // * so trigger the loading state again.
      setLoading(true);
      // * after some time, terminate the loading state, to show like button again.
      setLoadingToFalse();
      return;
    }

    const likePosted = await involvement.postLike(itemId);

    if (likePosted === 'error') {
      setError(true);
      return;
    }

    setLoading(false);
    // * after posting a like, update the like count.
    updateLikeCount();
  };

  if (loading) {
    return (
      <button
        type="button"
        className="like-button text-hue-rotate"
        ref={likeBtn}
        onClick={handleLikeSubmit}
        aria-label="loading"
      >
        <VscLoading size={20} className="like-icon loading-icon" />
      </button>
    );
  }

  return (
    <button
      type="button"
      className="like-button text-hue-rotate"
      ref={likeBtn}
      onClick={handleLikeSubmit}
      aria-label={error ? 'error' : 'like this project'}
    >
      <SlLike size={20} className="like-icon" />

      {/* ? when the API likes ary comes empty, likeCount will be 0 */}
      {/* * so show the error message that was set at the likes.length conditional */}
      {(likeCount > 0 || error) && (
        <span className="like-button__text">
          &nbsp;
          {!error ? likeCount : 'Error'}
        </span>
      )}
    </button>
  );
};

export default LikeButton;
