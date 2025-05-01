import {createContext, useContext, useState} from 'react';
// test
const Contexter = createContext();
export const ContextProvider = ({children}) => {
  const [user, setUser] = useState(null);
  return (
    <Contexter.Provider
      value={{
        user,
        setUser,
      }}>
      {children}
    </Contexter.Provider>
  );
};
export const useData = () => {
  return useContext(Contexter);
};
