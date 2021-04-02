import { InfiniteData, useInfiniteQuery } from 'react-query';
import { getPlacesNameByGeo, PlacesResponse } from '../../shared';

export const useQueryPlaceName = (): ((
  x: number,
  y: number,
) => Promise<PlacesResponse | undefined>) => {
  const { data: queryData, fetchNextPage } = useInfiniteQuery(
    'place_name',
    ({ pageParam }) => {
      if (!pageParam) return;
      return getPlacesNameByGeo(pageParam.longitude, pageParam.latitude);
    },
    {
      enabled: false,
      refetchOnWindowFocus: false,
    },
  );

  const fetchNextData = async (longitude: number, latitude: number) => {
    const requestedPageParam = { longitude, latitude };
    const oldPageParams = queryData?.pageParams;
    let queryObj:
      | InfiniteData<PlacesResponse | undefined>
      | undefined = queryData;

    if (!oldPageParams?.includes(requestedPageParam)) {
      queryObj = (await fetchNextPage({ pageParam: requestedPageParam })).data;
    }

    if (!queryObj) return;
    const pageIndex = queryObj.pageParams.findIndex(
      (param) => param === requestedPageParam,
    );

    if (pageIndex < 0) return;
    return queryObj.pages[pageIndex];
  };

  return fetchNextData;
};
