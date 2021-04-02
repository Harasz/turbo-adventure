import React, { FC } from 'react';
import { Spin } from 'antd';
import { Wrapper } from './components';

export const PageLoader: FC = () => {
  return (
    <Wrapper>
      <Spin size="large" />
    </Wrapper>
  );
};
