import { createContext, useState } from "react";

const MyContext = createContext();

const ContextProvider = ({ children }) => {
  const [newJobSubmitted, setNewJobSubmitted] = useState(false);
  const [jobListStatus, setJobListStatus] = useState(false);
  const [jobIdTable, setJobIdTable] = useState("");
  const [jobIdList, setJobIdList] = useState([]);
  const [deletedJob,setDeletedJob]=useState(false)
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
        deletedJob,
        setDeletedJob
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export { MyContext, ContextProvider };
