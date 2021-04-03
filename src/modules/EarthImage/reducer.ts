import { useReducer } from 'react';

type State = {
  srcData: string;
  isLoading: boolean;
};

type Handlers = {
  updateSrc: (src: State['srcData']) => void;
  errorOccurred: () => void;
  startLoading: () => void;
};

enum ActionNames {
  'UPDATE_SRC' = 'UPDATE_SRC',
  'ERROR' = 'ERROR',
  'START_LOADING' = 'START_LOADING',
}
type Action =
  | {
      type: ActionNames.UPDATE_SRC;
      src: State['srcData'];
    }
  | {
      type: ActionNames.ERROR;
    }
  | {
      type: ActionNames.START_LOADING;
    };

const PLACEHOLDER_IMAGE = {
  DEFAULT: 'https://via.placeholder.com/600x600.png?text=Earth+Image',
  ERROR: 'https://via.placeholder.com/600x600.png?text=API+Error',
  LOADING: 'https://via.placeholder.com/600x600.png?text=Loading...',
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case ActionNames.UPDATE_SRC:
      return {
        ...state,
        isLoading: false,
        srcData: action.src,
      };
    case ActionNames.ERROR:
      return {
        ...state,
        isLoading: false,
        srcData: PLACEHOLDER_IMAGE.ERROR,
      };
    case ActionNames.START_LOADING:
      return {
        ...state,
        isLoading: true,
        srcData: PLACEHOLDER_IMAGE.LOADING,
      };
  }
}

const defaultState: State = {
  isLoading: false,
  srcData: PLACEHOLDER_IMAGE.DEFAULT,
};

export const useImageState = (): [State, Handlers] => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  const handlers = {
    updateSrc: (src: State['srcData']) =>
      dispatch({ type: ActionNames.UPDATE_SRC, src }),
    errorOccurred: () => dispatch({ type: ActionNames.ERROR }),
    startLoading: () => dispatch({ type: ActionNames.START_LOADING }),
  };

  return [state, handlers];
};
