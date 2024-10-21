import { useState } from "react";
import { privateRequest } from "../api/privateRequest";

const useSubscriptionDetails = () => {
  const [subDetails, setSubDetails] = useState({});
  const [subLoading, setSubLoading] = useState(false);
  const getSubDetails = async () => {
    setSubLoading(true);
    try {
      const data = await privateRequest.get("/api/payments/get-payment");
      //  console.log('data', data.data);
      setSubDetails(data.data);
    } catch (error) {
      console.log("error", error);
    } finally {
      setSubLoading(false);
    }
  };
  return { getSubDetails, subDetails, subLoading };
};

export default useSubscriptionDetails;
