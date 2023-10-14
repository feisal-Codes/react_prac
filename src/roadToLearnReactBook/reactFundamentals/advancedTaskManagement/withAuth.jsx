import React, { useState, useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import Select from "./formComponents/select";
import { users } from "./data";
import TaskManagement from "./index";

const withAuth = (WrappedComponent) => {
  return () => {
    const [login, setLogin] = useLocalStorage("login", "");
    const [userId, setUserId] = useState("");

    const handleChange = (e) => {
      let { value } = e.target;
      setUserId(value);
    };

    useEffect(() => {
      if (userId) {
        setLogin(userId);
      }
    }, [userId]);

    if (!login) {
      return (
        <Select
          options={users}
          onChange={handleChange}
          value={userId}
          label="login as"
        />
      );
    }

    return <WrappedComponent login={login} />;
  };
};

const AuthComponent = withAuth(TaskManagement);

export default AuthComponent;
