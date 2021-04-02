import React, { FC } from 'react';
import { Wrapper } from './components';

interface Props {
  children: React.ReactNode;
}

export const Layout: FC<Props> = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};
export { LayoutGrid } from './components';
