import { createContext, useState } from "react";

const MyContext = createContext();

const ContextProvider = ({ children }) => {
  const [newJobSubmitted, setNewJobSubmitted] = useState(false);
  const [jobListStatus, setJobListStatus] = useState(false);
  return (
    <MyContext.Provider
      value={{
        newJobSubmitted,
        setNewJobSubmitted,
        jobListStatus,
        setJobListStatus,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export { MyContext, ContextProvider };
