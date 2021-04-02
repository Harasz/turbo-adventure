import React, { FC, useEffect, useState } from 'react';
import { AutoComplete, Input } from 'antd';
import { Wrapper } from './components';
import { useAppContext } from '../App/AppContext';
import { useQueryPlaces } from './helpers';
import { PlacesResponse } from '../../shared';

export const Search: FC = () => {
  const [isTyping, setIsTyping] = useState(false);
  const [{ placeName }, { setCoordinates, setPlaceName }] = useAppContext();
  const [places, setPlaces] = useState<PlacesResponse['features']>([]);
  const fetchPlaces = useQueryPlaces();

  const handleSearch = async (text: string) => {
    // Start search if text is long enough
    if (text.length <= 1) return;

    const places = await fetchPlaces(text);
    if (!places) return;

    setPlaces(places.features);
  };

  const handleSelected = (selectedName: string) => {
    setIsTyping(true);
    const selectedPlace = places.find(
      (place) => place.place_name === selectedName,
    );

    if (!selectedPlace) {
      return;
    }

    setCoordinates(selectedPlace.geometry.coordinates);
    setPlaceName(selectedName);
  };

  useEffect(() => {
    setIsTyping(false);
  }, [placeName]);

  const options = places.map((place) => ({ value: place.place_name }));

  return (
    <Wrapper>
      <AutoComplete
        onChange={handleSelected}
        style={{ width: '100%' }}
        options={options}
        onSearch={handleSearch}
        value={isTyping ? undefined : placeName}
      >
        <Input.Search size="large" placeholder="Type place" allowClear />
      </AutoComplete>
    </Wrapper>
  );
};
