import styled from 'styled-components';
import { Layout } from 'antd';

export const Wrapper = styled(Layout)`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100vw;
  height: 100vh;

  @media (max-width: 1120px) {
    height: auto;
    padding: 32px 0;
  }

  @media (max-width: 650px) {
    padding: 32px 16px;
  }
`;

export const LayoutGrid = styled.div`
  display: grid;
  grid-template-columns: auto minmax(500px, auto);
  grid-template-rows: auto auto;
  gap: 0px 0px;
  grid-template-areas:
    'image search'
    'image map';

  @media (max-width: 1120px) {
    grid-template-columns: minmax(auto, 572px);
    grid-template-rows: auto auto auto;
    grid-template-areas:
      'search'
      'map'
      'image';
  }

  @media (max-width: 650px) {
    grid-template-columns: 1fr;
  }

  *:nth-child(1) {
    grid-area: search;
  }

  *:nth-child(2) {
    grid-area: map;
  }

  *:nth-child(3) {
    grid-area: image;
  }
`;
