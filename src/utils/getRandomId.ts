const getRandomId = () => {
  let randomId;
  if (
    typeof crypto !== 'undefined'
    && typeof crypto.randomUUID === 'function'
  ) {
    // * Use crypto.randomUUID() if supported
    randomId = crypto.randomUUID();
  } else {
    // * Fallback to Math.random() if crypto.randomUUID() is not supported
    randomId = Math.random().toString(36);
  }

  return randomId;
};

export default getRandomId;
