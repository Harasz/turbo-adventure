import React, { createContext, FC, useContext, useReducer } from 'react';

export type AppContext = [
  // Values
  {
    coordinates: {
      latitude: number;
      longitude: number;
    };
  },
  // Handlers
  {
    setCoordinates: (values: [number, number]) => void;
  },
];

const defaultValues = {
  coordinates: {
    latitude: 50.29389,
    longitude: 18.6629739,
  },
};

export const AppContext = createContext<AppContext>([
  defaultValues,
  {
    setCoordinates: () => {
      throw new Error('Used outside of AppContext');
    },
  },
]);

type State = AppContext[0];
type Handlers = AppContext[1];

enum ActionNames {
  'COORDINATES' = 'COORDINATES',
}
type Action = { type: ActionNames.COORDINATES; coordinates: [number, number] };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case ActionNames.COORDINATES:
      return {
        ...state,
        coordinates: {
          longitude: action.coordinates[1],
          latitude: action.coordinates[0],
        },
      };
  }
}

export const AppContextProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultValues);

  const handlers: Handlers = {
    setCoordinates: (values) =>
      dispatch({ type: ActionNames.COORDINATES, coordinates: values }),
  };

  console.log(state);

  return (
    <AppContext.Provider value={[state, handlers]}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContext => useContext(AppContext);
