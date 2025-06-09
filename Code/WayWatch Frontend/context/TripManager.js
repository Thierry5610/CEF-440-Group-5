import React, { createContext, useContext, useReducer } from 'react';

const TripContext = createContext();

const initialState = {
  currentTrip: null,
  tripHistory: [],
  isLoading: false,
  error: null,
};

const tripReducer = (state, action) => {
  switch (action.type) {
    case 'START_TRIP':
      return {
        ...state,
        currentTrip: {
          id: Date.now(),
          startLocation: action.payload.startLocation,
          destination: action.payload.destination,
          route: action.payload.route,
          startTime: new Date().toISOString(),
          status: 'active',
        },
        isLoading: false,
      };
    
    case 'COMPLETE_TRIP':
      return {
        ...state,
        tripHistory: [
          ...state.tripHistory,
          {
            ...state.currentTrip,
            endTime: new Date().toISOString(),
            status: 'completed',
          },
        ],
        currentTrip: null,
      };
    
    case 'CANCEL_TRIP':
      return {
        ...state,
        currentTrip: null,
      };
    
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    
    default:
      return state;
  }
};

export const TripProvider = ({ children }) => {
  const [state, dispatch] = useReducer(tripReducer, initialState);

  const startTrip = (startLocation, destination, route) => {
    dispatch({
      type: 'START_TRIP',
      payload: { startLocation, destination, route },
    });
  };

  const completeTrip = () => {
    dispatch({ type: 'COMPLETE_TRIP' });
  };

  const cancelTrip = () => {
    dispatch({ type: 'CANCEL_TRIP' });
  };

  const setLoading = (loading) => {
    dispatch({ type: 'SET_LOADING', payload: loading });
  };

  const setError = (error) => {
    dispatch({ type: 'SET_ERROR', payload: error });
  };

  return (
    <TripContext.Provider
      value={{
        ...state,
        startTrip,
        completeTrip,
        cancelTrip,
        setLoading,
        setError,
      }}
    >
      {children}
    </TripContext.Provider>
  );
};

export const useTrip = () => {
  const context = useContext(TripContext);
  if (!context) {
    throw new Error('useTrip must be used within a TripProvider');
  }
  return context;
};