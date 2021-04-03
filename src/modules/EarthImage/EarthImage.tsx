import React, { FC, useEffect, useRef, useState } from 'react';
import { fetchImage } from '../../shared';
import { useAppContext } from '../App/AppContext';
import { Image } from './components';

export const EarthImage: FC = () => {
  const [{ coordinates }] = useAppContext();
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [srcData, setSrcData] = useState(PLACEHOLDER_IMAGE.DEFAULT);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const setImage = async () => {
      setIsLoading(true);
      try {
        const imageBlob = await fetchImage(coordinates[1], coordinates[0]);
        const src = URL.createObjectURL(imageBlob);
        setSrcData(src);
      } catch (e) {
        setSrcData(PLACEHOLDER_IMAGE.ERROR);
      } finally {
        setIsLoading(false);
      }
    };
    setImage();
  }, [coordinates]);

  return (
    <Image
      src={isLoading ? PLACEHOLDER_IMAGE.LOADING : srcData}
      ref={imageRef}
    />
  );
};

const PLACEHOLDER_IMAGE = {
  DEFAULT: 'https://via.placeholder.com/600x600.png?text=Earth+Image',
  ERROR: 'https://via.placeholder.com/600x600.png?text=API+Error',
  LOADING: 'https://via.placeholder.com/600x600.png?text=Loading...',
};
