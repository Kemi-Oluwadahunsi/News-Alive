const CACHE_KEY = "news_app_cache";
const CACHE_EXPIRATION = 60 * 60 * 1000; // 1 hour

export const setCache = (key, data) => {
  const cacheData = {
    data,
    timestamp: Date.now(),
  };
  localStorage.setItem(`${CACHE_KEY}_${key}`, JSON.stringify(cacheData));
};

export const getCache = (key) => {
  const cachedData = localStorage.getItem(`${CACHE_KEY}_${key}`);
  if (!cachedData) return null;

  const { data, timestamp } = JSON.parse(cachedData);
  if (Date.now() - timestamp > CACHE_EXPIRATION) {
    localStorage.removeItem(`${CACHE_KEY}_${key}`);
    return null;
  }

  return data;
};
