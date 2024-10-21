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
    <div className="container-fluide">
      <Flex height="100dvh" direction="column" gap="2">
        {profileLoading ? (
          <Skeleton width="350px" height="200px" className="mt-4" />
        ) : (
          <Box className="mt-4" width="350px">
            <Card size="2">
              <Flex gap="3" align="center">
                <Box>
                  <Text as="div" size="2" weight="bold">
                    PROFILE DETAILS
                  </Text>
                  {/* <Text as="div" size="2" color="gray">
                    PROFILE
                  </Text> */}
                </Box>
              </Flex>
              <hr />
              <Flex direction="column">
                <Box>
                  <Text>FullName</Text>:
                  {editName ? (
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
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
                      <Button onClick={update}>Update</Button>
                    )
                  ) : (
                    <Button onClick={editname}>Edit Name</Button>
                  )}
                </Box>
              </Flex>
            </Card>
          </Box>
        )}
        {subLoading === true ? (
          <Skeleton width="350px" height="200px" />
        ) : Object.keys(subDetails).length == 0 ? null : (
          <Box width="350px">
            <Card size="2">
              <Flex gap="3" align="center">
                <Box>
                  <Text as="div" size="2" weight="bold">
                    Subscription Details
                  </Text>
                  {/* <Text as="div" size="2" color="gray">
                  Subscription Details
                </Text> */}
                </Box>
              </Flex>
              <hr />
              <Flex direction="column">
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
            </Card>
          </Box>
        )}
        <Box width="350px">
          <Card size="2">
            <Flex gap="3" align="center">
              <Box>
                <Text as="div" size="2" weight="bold">
                  Change Password
                </Text>
                {/* <Text as="div" size="2" color="gray">
                  Subscription Details
                </Text> */}
              </Box>
            </Flex>
            <hr />
            <Flex direction="column">
              <Box>
                <Flex direction="column">
                  <Text>Previous Password:</Text>
                  <input
                    className="user_log_reg_fields w-input"
                    value={previous}
                    onChange={(e) => setPrevious(e.target.value)}
                  />
                </Flex>
              </Box>
              <Box>
                <Flex direction="column">
                  <Text>New Password:</Text>
                  <input
                    className="user_log_reg_fields w-input"
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                  />
                </Flex>
              </Box>
              <Box>
                <Flex direction="column">
                  <Text>Confirm Password</Text>

                  <input
                    className="user_log_reg_fields w-input"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </Flex>
              </Box>
              <Box>
                <Button onClick={changePassword}>Update Password</Button>
              </Box>
            </Flex>
          </Card>
        </Box>
      </Flex>
    </div>
  );
};

export default Profile;
