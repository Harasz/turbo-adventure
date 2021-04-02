import styled from 'styled-components';
import { Layout } from 'antd';

export const Wrapper = styled(Layout)`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100vw;
  height: 100vh;
`;

export const LayoutGrid = styled.div`
  display: grid;
  grid-template-columns: auto minmax(500px, auto);
  grid-template-rows: auto auto;
  gap: 0px 0px;
  grid-template-areas:
    'image search'
    'image map';

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
