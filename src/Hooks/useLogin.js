import { useState } from "react";
import { useAuthContext } from "./useAuthContex";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (userId, password) => {
    setError(null);

    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/admin/login`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ userId, password }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      setError(data.error);
    }
    if (data.success === true) {
      //save user data in local storage
      localStorage.setItem("user", JSON.stringify(data));

      //update user context
      dispatch({ type: "LOGIN", payload: data });
    } else {
      setError(data.message);
    }
  };

  return { login, error };
};
