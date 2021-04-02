import React, { createContext, FC, useContext, useReducer } from 'react';

export type AppContext = [
  // Values
  {
    coordinates: [number, number];
    placeName: string;
  },
  // Handlers
  {
    setCoordinates: (values: [number, number]) => void;
    setPlaceName: (value: string) => void;
  },
];

const defaultValues: State = {
  coordinates: [50.29389, 18.6629739],
  placeName: 'Somewhere in Gliwice',
};

export const AppContext = createContext<AppContext>([
  defaultValues,
  {
    setCoordinates: () => {
      throw new Error('Used outside of AppContext');
    },
    setPlaceName: () => {
      throw new Error('Used outside of AppContext');
    },
  },
]);

type State = AppContext[0];
type Handlers = AppContext[1];

enum ActionNames {
  'COORDINATES' = 'COORDINATES',
  'PLACE_NAME' = 'PLACE_NAME',
}
type Action =
  | {
      type: ActionNames.COORDINATES;
      coordinates: State['coordinates'];
    }
  | {
      type: ActionNames.PLACE_NAME;
      placeName: State['placeName'];
    };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case ActionNames.COORDINATES:
      return {
        ...state,
        coordinates: [action.coordinates[1], action.coordinates[0]],
      };
    case ActionNames.PLACE_NAME:
      return {
        ...state,
        placeName: action.placeName,
      };
  }
}

export const AppContextProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultValues);

  const handlers: Handlers = {
    setCoordinates: (values) =>
      dispatch({ type: ActionNames.COORDINATES, coordinates: values }),
    setPlaceName: (value) =>
      dispatch({ type: ActionNames.PLACE_NAME, placeName: value }),
  };

  return (
    <AppContext.Provider value={[state, handlers]}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContext => useContext(AppContext);
