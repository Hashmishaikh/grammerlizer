import React from "react";
import { Link } from "react-router-dom";

const EmailVerifyAlert = () => {
  return (
    <section className="section-4">
      <div className="w-layout-blockcontainer container-w w-container">
        <div className="div-block-16">
          <div className="div-block-12">
            <h4 className="heading">GRAMMARA</h4>
            <div className="text-block-5">V1.1</div>
          </div>
          <h3 className="heading-3" style={{ fontSize: "16px" }}>
            Email Verify
          </h3>
          <div className="subtitle">Email Verification Message Sended</div>
          <div className="div-block-17">
            <div className="w-form">
              <div className="form w-clearfix">
                <div className="div-block-20 w-clearfix">
                  <div
                    style={{ marginBottom: "0px", fontSize: "18px" }}
                    className="supporttext"
                  >
                    Email has been sent to your email id.Click here to Signin{" "}
                    <Link
                      style={{
                        textDecoration: "none",
                        color: "#4b6387",
                        fontWeight: "700",
                      }}
                      to="/signin"
                    >
                      Go to Signin
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    // <Flex
    //   height="100vh"
    //   justify={"center"}
    //   align={"center"}
    //   direction="column"
    //   gap="2"
    // >
    //   <Box width="350px">
    //     <Card size="2">
    //       <Flex gap="3" align="center">
    //         <Avatar size="3" radius="full" fallback="G" color="indigo" />
    //         <Box>
    //           <Text as="div" size="2" weight="bold">
    //             Grammarly Tools
    //           </Text>
    //           <Text as="div" size="2" color="gray">
    //             Email Verification
    //           </Text>
    //         </Box>
    //       </Flex>
    //       <Text
    //         style={{ marginTop: "5px", marginBottom: "5px" }}
    //         as="div"
    //         size="3"
    //         color="gray"
    //       >
    //         Email has been sent to your email id.Click here to Signin
    //       </Text>
    //       <Link style={{ marginTop: "5px", marginBottom: "5px" }} to="/signin">
    //         <Button radius="large" variant="soft">
    //           Go to Signin
    //         </Button>
    //       </Link>
    //     </Card>
    //   </Box>
    // </Flex>
  );
};

export default EmailVerifyAlert;
