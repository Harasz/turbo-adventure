import React from 'react';
import { Alert, Button } from 'antd';
import { Wrapper } from './components';

export class ErrorBoundary extends React.Component<Props, State> {
  state = { hasError: false };

  constructor(props: never) {
    super(props);
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  onClick = (): void => {
    this.setState({ hasError: false });
  };

  render = (): React.ReactNode => {
    if (this.state.hasError) {
      return (
        <Wrapper>
          <Alert message="App has been crashed." type="error" showIcon />
          <Button type="primary" size={'large'} onClick={this.onClick}>
            Reload App
          </Button>
        </Wrapper>
      );
    }

    return this.props.children;
  };
}

type State = {
  hasError: boolean;
};

type Props = {
  children: React.ReactNode;
};
