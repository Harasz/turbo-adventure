import React, { FC, useEffect, useRef } from 'react';
import { fetchImage } from '../../shared';
import { useAppContext } from '../App/AppContext';
import { Image } from './components';
import { useImageState } from './reducer';

export const EarthImage: FC = () => {
  const [{ coordinates }] = useAppContext();
  const [
    { srcData },
    { startLoading, errorOccurred, updateSrc },
  ] = useImageState();
  const imageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const setImage = async () => {
      startLoading();
      try {
        const imageBlob = await fetchImage(coordinates[1], coordinates[0]);
        const src = URL.createObjectURL(imageBlob);
        updateSrc(src);
      } catch (e) {
        errorOccurred();
      }
    };
    setImage();
  }, [coordinates]);

  return <Image src={srcData} ref={imageRef} />;
};
