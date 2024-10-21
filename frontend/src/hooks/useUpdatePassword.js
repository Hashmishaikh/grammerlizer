import React, { useState } from "react";
import { privateRequest } from "../api/privateRequest";
import toast from "react-hot-toast";

const useUpdatePassword = () => {
  const [pLoading, setPLoading] = useState(false);
  const updatePassoword = async (previous, password, confirmPassword) => {
    const success = handleInputErrors(previous, password, confirmPassword);
    if (!success) return;
    setPLoading(true);
    try {
      const updatePassword = await privateRequest.put(
        `/api/auth/update-password`,
        {
          previous,
          password,
          confirmPassword,
        }
      );
      console.log("updatePassword", updatePassword);
      toast.success(updatePassword.data.message)
    } catch (error) {
      console.log("error", error);
      toast.error(error.response.data.error);
    } finally {
      setPLoading(false);
    }
  };
  return { pLoading, updatePassoword };
};

export default useUpdatePassword;

function handleInputErrors(previous, password, confirmPassword) {
  if (!previous || !password || !confirmPassword) {
    toast.error("Please fill in all fields");
    return false;
  }

  return true;
}
