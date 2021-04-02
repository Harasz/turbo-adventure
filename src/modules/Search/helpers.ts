import { InfiniteData, useInfiniteQuery } from 'react-query';
import { PlacesResponse, getPlacesByText } from '../../shared';

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
