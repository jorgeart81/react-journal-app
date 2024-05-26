import axios from 'axios';

const cloudinaryLibrary = axios.create({
  baseURL: `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDNAME}`,
});

export { cloudinaryLibrary };
