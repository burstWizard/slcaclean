import React, { useState } from 'react';

export const MyStateContext = React.createContext();
export const MyStateProvider = ({ children }) => {
  const [myState, setMyState] = useState(false);

  return (
    <MyStateContext.Provider value={[myState, setMyState]}>
      {children}
    </MyStateContext.Provider>
  );
};