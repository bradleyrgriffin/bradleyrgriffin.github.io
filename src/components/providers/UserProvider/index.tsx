// userContext.tsx

import React, { createContext, useReducer, useContext, ReactNode } from 'react';

interface UserState {
  jwt: string | null;
  decoded: any | null;
  clientId: string | null;
}

interface SetUserAction {
  type: 'SET_USER';
  payload: UserState;
}

interface ClearUserAction {
  type: 'CLEAR_USER';
}

type UserAction = SetUserAction | ClearUserAction;

const initialState: UserState = {
  jwt: null,
  decoded: null,
  clientId: null,
};

const userReducer = (state: UserState, action: UserAction): UserState => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        ...action.payload,
      };
    case 'CLEAR_USER':
      return initialState;
    default:
      return state;
  }
};

interface UserContextProps {
  user: UserState;
  setUser: (user: UserState) => void;
  clearUser: () => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  const setUser = (user: UserState) => {
    console.dir(user);
    dispatch({ type: 'SET_USER', payload: user });
  };

  const clearUser = () => {
    dispatch({ type: 'CLEAR_USER' });
  };

  return (
    <UserContext.Provider value={{ user: state, setUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserState => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context.user;
};

export const useSetUser = (): ((user: UserState) => void) => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useSetUser must be used within a UserProvider');
  }
  return context.setUser;
};

export const useClearUser = (): (() => void) => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useClearUser must be used within a UserProvider');
  }
  return context.clearUser;
};
