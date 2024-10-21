import { useState } from "react";
import { publicRequest } from "../api/publicRequest";
import toast from "react-hot-toast";

const useForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const forgot = async (email) => {
    const success = handleInputErrors(email);
    if (!success) return;
    setLoading(true);
    try {
      // const data = await fetch("/api/auth/forgot-password", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ email }),
      // });
      const data = await publicRequest.post("/api/auth/forgot-password",{email})
      if (data.error) {
        throw new Error(data.error);
      }
      console.log(data);
      toast.success(data.data.message);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, forgot };
};

export default useForgotPassword;

function handleInputErrors(email) {
  let validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (!email) {
    toast.error("Please fill in all fields");
    return false;
  }

  if (!email.match(validRegex)) {
    toast.error("Invalid email");
    return false;
  }

  return true;
}
