import { createContext, useState, useEffect, useContext } from "react";
import { account } from "../appwriteConfig";
import LoaderCom from "../components/LoaderCom";

import { useNavigate } from "react-router-dom";
import { ID } from "appwrite";

const AuthContext = createContext();

export const Authprovider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    getUserOnLoad();
  }, []);

  const getUserOnLoad = async () => {
    try {
      const accountDetails = await account.get();
      setUser(accountDetails);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  const handleUserLogin = async (e, credentials) => {
    e.preventDefault();

    try {
      const response = await account.createEmailSession(
        credentials.email,
        credentials.password
      );
      console.log("Good to go !", response);
      const accountDetails = await account.get();
      setUser(accountDetails);
      navigate("/");
    } catch (error) {
      alert("Please enter valid credentials");
      console.log(error);
    }
  };

  const handleUserLogOut = async () => {
    await account.deleteSession("current");
    setUser(null);
  };

  const handleUserSignUp = async (e, credentials) => {
    e.preventDefault();

    if (credentials.password !== credentials.confirmPassword) {
      alert("Passwords do not match !!");
      return;
    }
    if (credentials.password.length <= 8) {
      alert("passwords should be more than 8 char !!");
      return;
    }
    try {
      let response = await account.create(
        ID.unique(),
        credentials.email,
        credentials.password,
        credentials.username
      );
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  const contextData = {
    user,
    handleUserLogin,
    handleUserLogOut,
    handleUserSignUp,
  };

  //react-loader-spinner
  return (
    <AuthContext.Provider value={contextData}>
      {loading ? <LoaderCom /> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;
