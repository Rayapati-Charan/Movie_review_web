import { createContext,useState } from "react";

const AuthContext=createContext({});

export const AuthProvider=({children})=>{
    const [userData,setUserData]= useState({})
    const [logdetails,setlogdetails]= useState({})
    const [datainder,setdatafinder]=useState({})
    return(
        <AuthContext.Provider value={{userData,setUserData,logdetails,setlogdetails,datainder,setdatafinder}}>
        {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;