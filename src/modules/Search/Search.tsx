import React, { FC, useState } from 'react';
import { AutoComplete } from 'antd';
import { Wrapper } from './components';
import { useAppContext } from '../App/AppContext';
import { useQueryPlaces, PlacesResponse } from './helpers';

export const Search: FC = () => {
  const [, { setCoordinates }] = useAppContext();
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
    const selectedPlace = places.find(
      (place) => place.place_name === selectedName,
    );

    if (!selectedPlace) {
      return;
    }

    setCoordinates(selectedPlace.geometry.coordinates);
  };

  const options = places.map((place) => ({ value: place.place_name }));

  return (
    <Wrapper>
      <AutoComplete
        onChange={handleSelected}
        style={{ width: '100%' }}
        options={options}
        onSearch={handleSearch}
        placeholder="Type place"
      />
    </Wrapper>
  );
};
