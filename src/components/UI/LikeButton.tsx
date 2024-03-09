import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
} from 'react';

import { SlLike } from 'react-icons/sl';
import { VscLoading } from 'react-icons/vsc';

import '../../styles/UI/LikeButton.scss';
import '../../styles/animations/loading-icon.scss';

import involvement from '../../services/involvementAPI/involvementAPI.ts';

interface Like {
  // * disable camelcase since 'item_id' is the name of the property in the API response.
  // eslint-disable-next-line camelcase
  item_id: string;
  likes: number;
  error?: boolean;
}
interface LikeButtonProps {
  itemId: string;
  projectsLikes: Like[];
}

const LikeButton: React.FC<LikeButtonProps> = ({ itemId, projectsLikes }) => {
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
  const setLoadingFalseAfterTimeout = useCallback(() => {
    setTimeout(() => {
      setLoading(false);
    }, maximumLoadingTime);
  }, []);

  const updateLikeCount = useCallback(() => {
    // ? When the Involvement API App ID is new, it will return an empty ary with an empty object
    // ? while fetching the projectsLikes at 'projectsPage',
    // * here we will receive an array with one empty object, thats the 1 length.
    // * so just terminate the loading state, and show the like button with no likes.
    if (projectsLikes.length === 1) {
      setLoadingFalseAfterTimeout();
      return;
    }

    // ? If an error was catch at the 'projectsPage' while fetching the projectsLikes,
    // ? we will receive an array with one object with the error property set to true.
    if (projectsLikes[0].error) {
      setError(true);
      // ? at this point the loading spinner is still showing.
      // * so terminate the loading state, to show the error message.
      setLoadingFalseAfterTimeout();
      return;
    }

    const likedProject = projectsLikes.find(
      (project) => project.item_id === itemId,
    ) as Like | undefined;

    if (likedProject) {
      setLikeCount(likedProject.likes);
      // ? at this point the loading spinner is still showing because of the initial API request.
      // * so terminate the loading state, to show the like button with the like count.
      setLoadingFalseAfterTimeout();
    } else {
      // * If a project has no likes, then terminate the loading state,
      // * to show the like button with no likes.
      setLoadingFalseAfterTimeout();
    }
  }, [itemId, setLoadingFalseAfterTimeout, projectsLikes]);

  useEffect(() => {
    updateLikeCount();
  }, [itemId, updateLikeCount]);

  const handleLikeSubmit = async () => {
    // ? Since 'wasLiked' was false, now it will be set to true. This is to
    // ? trigger the function 'styleButton' to add the 'liked' class to the button.
    setWasLiked((wasLiked) => !wasLiked);

    // * shows an instant update of the like count.
    if (!wasLiked) {
      setLikeCount((count) => count + 1);
      // * set 'wasLiked' to false, so that the user can like the project again.
      setWasLiked((wasLiked) => !wasLiked);
    }

    if (projectsLikes[0].error || error) {
      // ? at this point, there was an error already, so user will attempt to like again.
      // * so trigger the loading state again.
      setLoading(true);
      // * after some time, terminate the loading state, to show like button again.
      setLoadingFalseAfterTimeout();
      // * and finally show the error message.
      setError(true);
      return;
    }

    // ? If after all, the error state is still false, then the user can like the project.
    // * i.e. POST the like to the API.
    const likePosted = await involvement.postLike(itemId);

    if (likePosted === 'error') {
      setError(true);
      return;
    }

    setLoading(false);
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
          {error ? 'Error' : likeCount }
        </span>
      )}
    </button>
  );
};

export default LikeButton;
