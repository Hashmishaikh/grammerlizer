import React, { useState } from "react";
import { Link } from "react-router-dom";
import useForgotPassword from "../../hooks/useForgotPassword";
import Spinner from "react-bootstrap/esm/Spinner";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const { loading, forgot } = useForgotPassword();
  const handleForgot = async (e) => {
    e.preventDefault();
    await forgot(email);
  };
  return (
    <section className="section-4">
      <div className="w-layout-blockcontainer container-w w-container">
        <div className="div-block-16">
          <div className="div-block-12">
            <h4 className="heading">GRAMMARA</h4>
            <div className="text-block-5">V1.1</div>
          </div>
          <h3 className="heading-3">Welcome!!</h3>
          <div className="subtitle">Forgot Password</div>
          <div className="div-block-17">
            <div className="w-form">
              <form
                id="email-form"
                name="email-form"
                data-name="Email Form"
                className="form w-clearfix"
                data-wf-page-id="66b266240b18fbf34b96d36c"
                data-wf-element-id="ffe5d74d-55a7-e0ed-0369-45a760087c04"
                onSubmit={handleForgot}
              >
                <label htmlFor="name" className="field-label">
                  Email Address
                </label>
                <input
                  className="user_log_reg_fields w-input"
                  maxLength={256}
                  name="name"
                  data-name="Name"
                  placeholder=""
                  type="email"
                  id="name"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {/* <label htmlFor="" className="field-label-forgot">
                <Link style={{ textDecoration: "none" }} className="field-label-forgot" to="/signup">
                  SigUp?
                </Link>
                </label> */}
                <br />
                {loading ? (
                  <div className="submit-button w-button d-flex justify-content-center">
                    <Spinner animation="border" />
                  </div>
                ) : (
                  <input
                    type="submit"
                    data-wait="Please wait..."
                    className="submit-button w-button"
                    value="Submit"
                  />
                )}
                <div className="div-block-20 w-clearfix">
                  <div style={{ marginBottom: "0px" }} className="supporttext">
                    Already Have an account?
                  </div>
                  <Link
                    to="/signup"
                    style={{
                      marginTop: "0px",
                      marginBottom: "0px",
                      textDecoration: "none",
                    }}
                    for=""
                    className="field-label-forgot"
                  >
                    Click here
                  </Link>
                </div>
              </form>
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
    //                         Forget Password
    //                     </Text>
    //                 </Box>
    //             </Flex>
    //             <div style={{ marginTop: "10px", padding: "3px" }}>
    //                 <Flex style={{ marginTop: "4px" }} direction="column" gap="1" className="Fieldset">
    //                     <label className="Label" htmlFor="email">
    //                         Email
    //                     </label>
    //                     <input value={email} onChange={(e) => setEmail(e.target.value)} className="Input" id="email" />
    //                 </Flex>
    //                 <Flex justify="between" style={{ marginTop: "5px" }} >
    //                     <Link to="/signin">Signin</Link>
    //                     <Button onClick={handleForgot} radius="large" variant="soft">
    //                         Send
    //                     </Button>
    //                 </Flex>
    //             </div>

    //         </Card>
    //     </Box>
    // </Flex>
  );
};

export default ForgotPassword;
