import { AuthContext } from "../Contex/AuthContex";
import { useContext } from "react";

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw Error("useAuthContext can not be used");
  }

  return context;
};
