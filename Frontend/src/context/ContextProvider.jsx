import { createContext, useState } from "react";

const MyContext = createContext();

const ContextProvider = ({ children }) => {
  const [newJobSubmitted, setNewJobSubmitted] = useState(false);
  const [jobListStatus, setJobListStatus] = useState(false);
  const [jobIdTable, setJobIdTable] = useState("");
  const [jobIdList, setJobIdList] = useState([]);
  return (
    <MyContext.Provider
      value={{
        newJobSubmitted,
        setNewJobSubmitted,
        jobListStatus,
        setJobListStatus,
        jobIdTable,
        setJobIdTable,
        jobIdList,
        setJobIdList,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export { MyContext, ContextProvider };
