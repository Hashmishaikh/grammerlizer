import React from "react";
import { Avatar, Box, Button, Card, Flex, Text } from "@radix-ui/themes";
import usePayment from "../../hooks/usePayment";
const Pricing = () => {
  const { paymentsCall} = usePayment();
  const payment = async (data) => {
    await paymentsCall(data);
  };
  return (
    <Flex justify={"center"} align={"center"} direction="row" gap="2">
      <Flex
        height="100vh"
        justify={"center"}
        align={"center"}
        direction="column"
        gap="2"
      >
        <Box width="350px">
          <Card size="2">
            <Flex gap="3" align="center">
              <Avatar size="3" radius="full" fallback="G" color="indigo" />
              <Box>
                <Text as="div" size="2" weight="bold">
                  Grammarly Tools
                </Text>
                <Text as="div" size="2" color="gray">
                  Monthly Pricing
                </Text>
              </Box>
            </Flex>
            <Text
              style={{ marginTop: "5px", marginBottom: "5px" }}
              as="div"
              size="3"
              color="gray"
            >
              $free/month
            </Text>
            <Button radius="large" variant="soft">
              Free
            </Button>
          </Card>
        </Box>
      </Flex>
      {/* second */}
      <Flex
        height="100vh"
        justify={"center"}
        align={"center"}
        direction="column"
        gap="2"
      >
        <Box width="350px">
          <Card size="2">
            <Flex gap="3" align="center">
              <Avatar size="3" radius="full" fallback="G" color="indigo" />
              <Box>
                <Text as="div" size="2" weight="bold">
                  Grammarly Tools
                </Text>
                <Text as="div" size="2" color="gray">
                  yearly Pricing
                </Text>
              </Box>
            </Flex>
            <Text
              style={{ marginTop: "5px", marginBottom: "5px" }}
              as="div"
              size="3"
              color="gray"
            >
              $2/year
            </Text>
            <Button
              onClick={() => payment("yearly")}
              radius="large"
              variant="soft"
            >
              2$
            </Button>
          </Card>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Pricing;
