import { useState } from "react";
import toast from "react-hot-toast";
import { publicRequest } from "../api/publicRequest";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const login = async (email, password) => {
    const success = handleInputErrors(email, password);
    if (!success) return;
    setLoading(true);
    try {
      // const res = await fetch("/api/auth/login", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ email, password }),
      // });

      // const data = await res.json();
      const data = await publicRequest.post("/api/auth/login", {
        email,
        password,
      });
      if (data.error) {
        throw new Error(data.error);
      }
      console.log("data", data);
      sessionStorage.setItem("authUser", JSON.stringify(data?.data));
      navigate("/dashboard");
      // setAuthUser(data);
    } catch (error) {
      console.log("error", error);
      if (error.response.data.error) {
        toast.error(error.response.data.error);
        return;
      }
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, login };
};

export default useLogin;

function handleInputErrors(email, password) {
  if (!email || !password) {
    toast.error("Please fill in all fields");
    return false;
  }

  return true;
}
