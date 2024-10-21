import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { publicRequest } from "../api/publicRequest";
import toast from "react-hot-toast";
import { privateRequest } from "../api/privateRequest";

const usePayment = () => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const paymentsCall = async (planData) => {
    setLoading(true);
    try {
      // const res = await fetch("/api/payments/payment", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({ plan: planData }),
      // });
      // const data = await res.json();
      const data = await privateRequest.post("/api/payments/payment", {
        plan: planData,
      });
      console.log("paymentLink", data);
      // const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
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

  return { loading, paymentsCall };
};

export default usePayment;
