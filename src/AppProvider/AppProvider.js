import React, { createContext, useContext, useState, useEffect} from "react";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});
  const[branches,setBranches]=useState([])

  const getUserDetails = async (authToken) => {
    try {
      const response = await fetch("http://localhost:8000/auth/me", {
        method: "GET",
        headers: {
          authorization: `${authToken}`,
        },
      });

      if (response.status === 200) {
        const userData = await response.json();
        setUser(userData)
        console.log(userData)
      } else {
        const errorData = await response.json();
        throw new Error(`Failed to fetch user details: ${errorData.message}`);
      }
    } catch (err) {
      console.error("Error fetching user details:", err);
    }
  };

  useEffect(()=>{
    const initAuth=async()=>{

      const authToken=localStorage.getItem('authorization')
      if(authToken){
        setLogin()
         await getUserDetails(authToken);
      }
      else{
        setLogout()
      }
    }

    initAuth()
    },[])

  const setLogin=()=>{
     setIsAuthenticated(true)
  }
  const setLogout=()=>{
    setIsAuthenticated(false)
  }

  const contextValue = {
    isAuthenticated,
    user,
    setUser,
    setLogin,
    setLogout,
    branches,
    setBranches
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
}

export function useModal() {
  return useContext(AppContext);
}
