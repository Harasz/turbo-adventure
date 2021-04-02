export interface PlacesResponse {
  type: string;
  query: string[];
  features: {
    place_name: string;
    geometry: {
      coordinates: [number, number];
    };
  }[];
}

const fetchFromApi = async (url: URL) => {
  const params = new URLSearchParams();
  params.set('access_token', process.env.REACT_APP_MAPBOX_TOKEN || '');
  url.search = params.toString();

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error();
  }
  return (await response.json()) as PlacesResponse;
};

export const getPlacesNameByGeo = async (
  longitude: number,
  latitude: number,
): Promise<PlacesResponse> => {
  const url = new URL(
    `http://api.tiles.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json`,
  );

  return fetchFromApi(url);
};

export const getPlacesByText = async (
  text: string,
): Promise<PlacesResponse> => {
  const url = new URL(
    `http://api.tiles.mapbox.com/geocoding/v5/mapbox.places/${text}.json`,
  );

  return fetchFromApi(url);
};
