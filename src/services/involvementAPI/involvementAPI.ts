const baseURL = process.env.REACT_APP_INVOLVEMENT_API_BASE_URL;
const appId = process.env.REACT_APP_INVOLVEMENT_API_APP_ID;

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
  const response = await fetch(`${baseURL}${appId}/likes/`, {
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error(`Error fetching likes: ${response.statusText}`);
  }

  // * Only parse the response if it's JSON.
  // * specially when the involvementAPI : 'appId' is new, the response to be parsed wont be JSON.
  const contentType = response.headers.get('Content-Type');
  if (contentType && contentType.includes('application/json')) {
    const likes = await response.json();
    if (likes instanceof Array) return likes;
  }

  return [];
};

const involvement = {
  postLike,
  getLikes,
};

export default involvement;
