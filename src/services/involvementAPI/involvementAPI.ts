import config from '../../config.ts';

const { baseURL, appId } = config.involvementAPI;

const postLike = async (itemId: string) => {
  try {
    const response = await fetch(`${baseURL}${appId}/likes/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        item_id: itemId,
      }),
      redirect: 'follow',
    });

    if (!response.ok) return 'error';

    const status = await response.text();
    return status;
  } catch (error) {
    return error;
  }
};

const getLikes = async () => {
  try {
    const response = await fetch(`${baseURL}${appId}/likes/`, {
      method: 'GET',
    });

    if (!response.ok) return [];

    const likes = await response.json();
    return likes;
  } catch (error) {
    return error;
  }
};

const involvement = {
  postLike,
  getLikes,
};

export default involvement;
