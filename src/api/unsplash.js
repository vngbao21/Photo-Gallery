import axios from 'axios';

// Unsplash API access key
const UNSPLASH_ACCESS_KEY = 'MYtBGDg8GRfK0SbTAtl2sEy-P3uZjDJgoOWlE5eofXA';

// Create an axios instance with the base URL and headers
const api = axios.create({
  baseURL: 'https://api.unsplash.com',
  headers: {
    Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
  },
});

/**
 * Fetch a list of photos from Unsplash API.
 * @param {number} page - The page number to fetch.
 * @returns {Promise<Array>} - A promise that resolves to an array of photos.
 */
export const fetchPhotos = async (page = 1) => {
  const response = await api.get('/photos', {
    params: { page, per_page: 10 },
  });
  return response.data;
};

/**
 * Fetch a single photo by its ID from Unsplash API.
 * @param {string} id - The ID of the photo to fetch.
 * @returns {Promise<Object>} - A promise that resolves to the photo object.
 */
export const fetchPhotoById = async (id) => {
  const response = await api.get(`/photos/${id}`);
  return response.data;
};
