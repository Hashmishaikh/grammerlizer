import { Box, Button, Card, Flex, Skeleton, Text } from "@radix-ui/themes";
import moment from "moment";
import { useEffect, useState } from "react";
import useProfile from "../../hooks/useProfile";
import useSubscriptionDetails from "../../hooks/useSubscriptionDetails";
import useUpdateProfile from "../../hooks/useUpdateProfile";
import Spinner from "react-bootstrap/esm/Spinner";
import useUpdatePassword from "../../hooks/useUpdatePassword";

const Profile = () => {
  const { getProfileDetails, profileLoading, profile } = useProfile();
  const { getSubDetails, subDetails, subLoading } = useSubscriptionDetails();
  const { updateProfile, loading } = useUpdateProfile();
  const { updatePassoword, ploading } = useUpdatePassword();
  const [editName, setEditName] = useState(false);
  const [fullName, setFullName] = useState("");

  const [previous, setPrevious] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const changePassword = async () => {
    await updatePassoword(previous, pass, confirmPassword);
    setPrevious("");
    setPass("");
    setConfirmPassword("");
  };

  const editname = () => {
    setEditName(true);
  };

  console.log("subDetails", Object.keys(subDetails).length);

  const update = async () => {
    await updateProfile(fullName);
    setEditName(false);
    getProfileDetails();
  };
  useEffect(() => {
    getProfileDetails();
    getSubDetails();
  }, []);
  return (
    <div className="container mx-auto px-4 flex justify-center items-center h-screen">
      <Flex className="flex-col gap-4" height="100dvh">
        {profileLoading ? (
          <Skeleton className="w-400px h-200px mt-4" />
        ) : (
          <Box className="mt-4 w-full">
            <div className="shadow-lg rounded-lg p-4 bg-white w-96">
              <Flex className="flex-row gap-3 items-center">
                <Box>
                  <Text className="text-lg font-bold">
                    PROFILE DETAILS
                  </Text>
                </Box>
              </Flex>
              <hr className="my-4" />
              <Flex className="flex-col">
                <Box>
                  <Text>FullName</Text>:
                  {editName ? (
                    <input
                      className="form-input block w-full mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 border border-gray-300 rounded-md"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      autoFocus
                    />
                  ) : (
                    <Text>{profile?.fullName}</Text>
                  )}
                </Box>
                <Box>
                  <Text>Email</Text>:<Text>{profile?.email}</Text>
                </Box>
                <Box>
                  <Text>Created at:</Text>
                  <Text>{moment(profile?.createdAt).format("DD-MM-YY")}</Text>
                </Box>
                <Box>
                  {editName ? (
                    loading ? (
                      <Spinner animation="border" />
                    ) : (
                      <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={update}>Update</Button>
                    )
                  ) : (
                    <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={editname}>Edit Name</Button>
                  )}
                </Box>
              </Flex>
            </div>
          </Box>
        )}
        {subLoading === true ? (
          <Skeleton className="w-400px h-200px" />
        ) : Object.keys(subDetails).length == 0 ? null : (
          <Box className="w-400px">
            <div className="shadow-lg rounded-lg p-4 bg-white">
              <Flex className="flex-row gap-3 items-center">
                <Box>
                  <Text className="text-lg font-bold">
                    Subscription Details
                  </Text>
                </Box>
              </Flex>
              <hr className="my-4" />
              <Flex className="flex-col">
                <Box>
                  <Text>Subscription Plan</Text>:
                  <Text>{subDetails?.subscriptionPlan}</Text>
                </Box>
                <Box>
                  <Text>Payment Status</Text>:
                  <Text>{subDetails?.paymentStatus}</Text>
                </Box>
                <Box>
                  <Text>Start Date:</Text>
                  <Text>
                    {moment(subDetails?.startDate).format("DD-MM-YY")}
                  </Text>
                </Box>
                <Box>
                  <Text>End Date:</Text>
                  <Text>{moment(subDetails?.endDate).format("DD-MM-YY")}</Text>
                </Box>
                <Box>
                  <Text>Payment_Id:&nbsp;</Text>
                  <Text>{subDetails?.paymentId}</Text>
                </Box>
              </Flex>
            </div>
          </Box>
        )}
        <Box className="w-400px">
          <div className="shadow-lg rounded-lg p-4 bg-white">
            <Flex className="flex-row gap-3 items-center">
              <Box>
                <Text className="text-lg font-bold">
                  Change Password
                </Text>
              </Box>
            </Flex>
            <hr className="my-4" />
            <Flex className="flex-col">
              <Box>
                <Flex className="flex-col">
                  <Text>Previous Password:</Text>
                  <input
                                         className="form-input block w-full mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 border border-gray-300 rounded-md"

                    value={previous}
                    onChange={(e) => setPrevious(e.target.value)}
                  />
                </Flex>
              </Box>
              <Box>
                <Flex className="flex-col">
                  <Text>New Password:</Text>
                  <input
                                         className="form-input block w-full mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 border border-gray-300 rounded-md"

                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                  />
                </Flex>
              </Box>
              <Box>
                <Flex className="flex-col">
                  <Text>Confirm Password</Text>

                  <input
                                         className="form-input block w-full mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 border border-gray-300 rounded-md"

                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </Flex>
              </Box>
              <Box>
                <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={changePassword}>Update Password</Button>
              </Box>
            </Flex>
          </div>
        </Box>
      </Flex>
    </div>
  );
};

export default Profile;
