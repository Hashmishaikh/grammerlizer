import { useState } from "react";
import { privateRequest } from "../api/privateRequest";

const useProfile = () => {
  const [profile, setProfile] = useState();
  const [profileLoading, setProfileLoading] = useState(false);
  const getProfileDetails = async () => {
    setProfileLoading(true);
    try {
      const data = await privateRequest.get(`/api/auth/profile`);
      //   console.log('data', data.data);
      setProfile(data.data);
    } catch (error) {
      console.log("error", error);
    } finally {
      setProfileLoading(false);
    }
  };

  return { getProfileDetails, profileLoading, profile };
};

export default useProfile;
