import { useEffect, useState } from 'react';
import {
  ImageListItem,
  ImageList,
  useTheme,
  useMediaQuery,
} from '@mui/material';

interface Props {
  images?: Array<string>;
}

const listParams = {
  xs: {
    cols: 1,
    rh: 100,
  },
  sm: {
    cols: 2,
    rh: 200,
  },
  md: {
    cols: 3,
    rh: 200,
  },
  lg: {
    cols: 4,
    rh: 200,
  },
  xl: {
    cols: 5,
    rh: 300,
  },
};

export const ImageGallery = ({ images }: Props) => {
  const [photos, setphotos] = useState<Array<string>>([]);

  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.only('xs'));
  const sm = useMediaQuery(theme.breakpoints.only('sm'));
  const md = useMediaQuery(theme.breakpoints.only('md'));
  const lg = useMediaQuery(theme.breakpoints.only('lg'));
  const xl = useMediaQuery(theme.breakpoints.only('xl'));

  const currentMQ = () => {
    let mq: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'sm';

    if (xs) mq = 'xs';
    if (sm) mq = 'sm';
    if (md) mq = 'md';
    if (lg) mq = 'lg';
    if (xl) mq = 'xl';

    return listParams[mq];
  };

  currentMQ().cols;

  useEffect(() => {
    if (!images) return;
    setphotos(images);
  }, [images]);

  return (
    <ImageList
      sx={{ width: '100%', height: 500 }}
      cols={currentMQ().cols}
      rowHeight={currentMQ().rh}>
      {photos.map(image => (
        <ImageListItem key={image}>
          <img
            src={`${image}?w=164&h=164&fit=crop&auto=format`}
            srcSet={`${image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            alt='Imagen de la nota'
            loading='lazy'
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
};
