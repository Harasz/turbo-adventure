export const fetchImage = async (
  longitude: number,
  latitude: number,
): Promise<Blob> => {
  const url = new URL('https://api.nasa.gov/planetary/earth/imagery');
  const params = new URLSearchParams();

  params.set('lon', longitude.toString());
  params.set('lat', latitude.toString());
  params.set('date', new Date().toISOString().slice(0, 'YYYY-MM-DD'.length));
  params.set('dim', '0.15');
  params.set('api_key', process.env.REACT_APP_NASA_TOKEN || 'DEMO_KEY');

  url.search = params.toString();

  const response = await fetch(url.toString());

  if (!response.ok) throw new Error('');

  return response.blob();
};
