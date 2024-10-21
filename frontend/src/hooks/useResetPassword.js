import { useState } from "react";
import { publicRequest } from "../api/publicRequest";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const reset = async (token, { password, confirmPassword }) => {
    const success = handleInputErrors({ password, confirmPassword });
    if (!success) return;
    setLoading(true);
    try {
      // const data = await fetch("/api/auth/reset-password", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ password, confirmPassword, token }),
      // });
      const data = await publicRequest.post("/api/auth/reset-password", {
        password,
        confirmPassword,
        token,
      });
      if (data.error) {
        throw new Error(data.error);
      }
      await toast.success(data.data.message);
      navigate("/signin");
      // console.log(data)
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, reset };
};

export default useResetPassword;

function handleInputErrors({ password, confirmPassword }) {
  if (!password || !confirmPassword) {
    toast.error("Please fill in all fields");
    return false;
  }

  if (password !== confirmPassword) {
    toast.error("Password do not match");
    return false;
  }

  return true;
}
