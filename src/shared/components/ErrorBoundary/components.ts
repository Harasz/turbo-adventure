import { Content } from 'antd/lib/layout/layout';
import styled from 'styled-components';

export const Wrapper = styled(Content)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100vw;
  height: 100vh;

  button {
    margin-top: 8px;
  }
`;
