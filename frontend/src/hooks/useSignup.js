import { useState } from "react";
import toast from "react-hot-toast";
import { publicRequest } from "../api/publicRequest";
import { useNavigate } from "react-router-dom";

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const signup = async ({ fullName, email, password, confirmPassword }) => {
    const success = handleInputErrors({
      fullName,
      email,
      password,
      confirmPassword,
    });
    if (!success) return;
    setLoading(true);
    try {
      // const data = await fetch("/api/auth/signup", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({
      //     fullName,
      //     email,
      //     password,
      //     confirmPassword,
      //   }),
      // });
      const data = await publicRequest.post("/api/auth/signup", {
        fullName,
        email,
        password,
        confirmPassword,
      });
      if (data.error) {
        throw new Error(data.error);
      }
      navigate("/email-verification");
      // console.log(data)
    } catch (error) {
      // console.log('error', error)
      if(error.response.data.error){
       return toast.error(error.response.data.error)
      }
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, signup };
};

export default useSignup;

function handleInputErrors({ fullName, email, password, confirmPassword }) {
  if (!fullName || !email || !password || !confirmPassword) {
    toast.error("Please fill all fields");
    return false;
  }

  if (password !== confirmPassword) {
    toast.error("Password do not match");
    return false;
  }

  if (password.length < 6) {
    toast.error("Passeord must be atleast 6 character");
    return false;
  }

  return true;
}
