import { AxiosError } from 'axios';

import { cloudinaryLibrary } from '@/api';
import type { CloudinaryResponse } from './imagesService.interface';

export class ImagesService {
  static fileUpload = async (file: File) => {
    if (!file) throw new Error('Sin archivos a subir');

    const formData = new FormData();
    formData.append('upload_preset', import.meta.env.VITE_UPLOAD_PRESET);
    formData.append('file', file);

    try {
      const { data, statusText, status } =
        await cloudinaryLibrary.post<CloudinaryResponse>('/upload', formData);
      if (status !== 200) throw new Error('No se pudo subir la imagen.');

      return data.secure_url;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.error(error.response?.data);
        throw new Error(error.response?.data.message);
      }

      console.error(error);
      throw new Error('Unexpected error');
    }
  };
}
