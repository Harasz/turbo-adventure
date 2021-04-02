import { InfiniteData, useInfiniteQuery } from 'react-query';
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

const getPlacesByText = async (text: string): Promise<PlacesResponse> => {
  const url = new URL(
    `http://api.tiles.mapbox.com/geocoding/v5/mapbox.places/${text}.json`,
  );

  const params = new URLSearchParams();
  params.set('access_token', process.env.REACT_APP_MAPBOX_TOKEN || '');
  url.search = params.toString();

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error();
  }
  return (await response.json()) as PlacesResponse;
};

export const useQueryPlaces = (): ((
  x: string,
) => Promise<PlacesResponse | undefined>) => {
  const { data: queryData, fetchNextPage } = useInfiniteQuery(
    'places',
    ({ pageParam }) => {
      if (!pageParam) return;
      return getPlacesByText(pageParam);
    },
    {
      enabled: false,
      refetchOnWindowFocus: false,
    },
  );

  const fetchNextData = async (text: string) => {
    const oldPageParams = queryData?.pageParams;
    let queryObj:
      | InfiniteData<PlacesResponse | undefined>
      | undefined = queryData;

    if (!oldPageParams?.includes(text)) {
      queryObj = (await fetchNextPage({ pageParam: text })).data;
    }

    if (!queryObj) return;
    const pageIndex = queryObj.pageParams.findIndex((param) => param === text);

    if (pageIndex < 0) return;
    return queryObj.pages[pageIndex];
  };

  return fetchNextData;
};
