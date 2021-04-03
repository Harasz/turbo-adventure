import styled from 'styled-components';
import { Content } from 'antd/lib/layout/layout';

export const Wrapper = styled(Content)`
  background-color: #fff;
  flex: unset;
  padding: 16px;
  max-width: 500px;
  height: 500px;
  width: 100%;

  @media (max-width: 1120px) {
    max-width: unset;
  }
`;
