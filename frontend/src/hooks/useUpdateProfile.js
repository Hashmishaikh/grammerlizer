import { useState } from "react";
import { privateRequest } from "../api/privateRequest";

const useUpdateProfile = () => {
  const [loading, setLoading] = useState(false);
    const updateProfile = async (fullName) => {
        setLoading(true)
        try {
           const data = await privateRequest.put('/api/auth/update-profile',{fullName:fullName});
           console.log('data', data)
        } catch (error) {
            console.log('err', err);
        }finally{
            setLoading(false)
        }
    }
  return { loading,updateProfile };
};

export default useUpdateProfile;
