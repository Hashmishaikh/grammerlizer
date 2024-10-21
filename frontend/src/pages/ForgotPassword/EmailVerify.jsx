import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { publicRequest } from "../../api/publicRequest";

const EmailVerify = () => {
  const current_url = window.location.href;
  console.log("current_url", current_url);
  function extractToken(url) {
    // Using URLSearchParams to get the token parameter
    const params = new URLSearchParams(new URL(url).search);
    return params.get("token");
  }
  const token = extractToken(current_url);
  const verify = async () => {
    try {
      let data = await publicRequest.post("/api/auth/verify-email", {
        token: token,
      });
      console.log("data", data);
    } catch (err) {
      console.log("err", err);
    }
  };
  useEffect(() => {
    verify();
  }, [token]);

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
          <div className="subtitle">Email Verification Completed</div>
          <div className="div-block-17">
            <div className="w-form">
              <div className="form w-clearfix">
                <div className="div-block-20 w-clearfix">
                  <div
                    style={{ marginBottom: "0px", fontSize: "18px" }}
                    className="supporttext"
                  >
                    Your Email has been verify.Click here to Signin.{" "}
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
    // <Flex height="100vh" justify={"center"} align={"center"} direction="column" gap="2">
    //     <Box width="350px">
    //         <Card size="2">
    //             <Flex gap="3" align="center">
    //                 <Avatar size="3" radius="full" fallback="G" color="indigo" />
    //                 <Box>
    //                     <Text as="div" size="2" weight="bold">
    //                         Grammarly Tools
    //                     </Text>
    //                     <Text as="div" size="2" color="gray">
    //                         Email Verify
    //                     </Text>
    //                 </Box>
    //             </Flex>
    //             <Text style={{ marginTop: "5px", marginBottom: "5px" }} as="div" size="3" color="gray">Your Email has been verify.Click here to Signin</Text>
    //             <Link style={{ marginTop: "5px", marginBottom: "5px" }} to="/signin"><Button radius="large" variant="soft">
    //                 Go to Signin
    //             </Button></Link>
    //         </Card>
    //     </Box>
    // </Flex>
  );
};

export default EmailVerify;
