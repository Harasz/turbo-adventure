import React, { FC, useEffect } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from 'react-leaflet';
import L from 'leaflet';
import { useAppContext } from '../App/AppContext';
import { Wrapper } from './components';
import 'leaflet/dist/leaflet.css';

// Fix marker icon
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import { useQueryPlaceName } from './helpers';

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

export const Map: FC = () => {
  const [{ coordinates }] = useAppContext();

  return (
    <Wrapper>
      <MapContainer
        center={coordinates}
        zoom={16}
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={coordinates} eventHandlers={{}}>
          <Popup>Popup</Popup>
        </Marker>
        <MapConsumer />
      </MapContainer>
    </Wrapper>
  );
};

const MapConsumer: FC = () => {
  const [{ coordinates }, { setCoordinates, setPlaceName }] = useAppContext();
  const fetchPlaceName = useQueryPlaceName();
  const map = useMapEvents({
    click: async (event) => {
      setCoordinates([event.latlng.lng, event.latlng.lat]);

      const place = await fetchPlaceName(event.latlng.lng, event.latlng.lat);
      if (!place) return;
      setPlaceName(
        place.features.length > 0 ? place.features[0].place_name : 'Somewhere',
      );
    },
  });

  useEffect(() => {
    map.setView(coordinates);
  }, [coordinates]);

  return null;
};
