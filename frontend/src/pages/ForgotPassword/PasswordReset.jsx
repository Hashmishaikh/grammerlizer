import React, { useState } from "react";
import { Link } from "react-router-dom";
import useResetPassword from "../../hooks/useResetPassword";
import Spinner from "react-bootstrap/esm/Spinner";

const PasswordReset = () => {
  const current_url = window.location.href;
  // console.log('current_url', current_url);
  function extractToken(url) {
    // Using URLSearchParams to get the token parameter
    const params = new URLSearchParams(new URL(url).search);
    return params.get("token");
  }
  const token = extractToken(current_url);
  const { loading, reset } = useResetPassword();
  // console.log('token', token)
  const [inputs, setInputs] = useState({
    password: "",
    confirmPassword: "",
  });

  const resetPassword = async (e) => {
    e.preventDefault();
    await reset(token, inputs);
  };
  return (
    <section className="section-4">
      <div className="w-layout-blockcontainer container w-container">
        <div className="div-block-16" style={{ padding: "9px 30px" }}>
          <div className="div-block-12" style={{ marginBottom: "5px" }}>
            <h4 className="heading">GRAMMARA</h4>
            <div className="text-block-5">V1.1</div>
          </div>
          <h3 className="heading-3">Reset Password!!</h3>
          <div className="subtitle" style={{ marginBottom: "16px" }}>
            Use a valid email to get access
          </div>
          <div className="div-block-17">
            <div className="w-form">
              <form
                id="email-form"
                name="email-form"
                data-name="Email Form"
                className="form"
                data-wf-page-id="66b30f250459e1ccfc717cce"
                data-wf-element-id="ffe5d74d-55a7-e0ed-0369-45a760087c04"
                onSubmit={resetPassword}
              >
                <label htmlFor="email-2" className="field-label">
                  Password
                </label>
                <input
                  className="user_log_reg_fields w-input"
                  maxLength={256}
                  name="email-2"
                  data-name="Email 2"
                  placeholder=""
                  type="text"
                  id="email-2"
                  required=""
                  value={inputs.password}
                  onChange={(e) =>
                    setInputs({ ...inputs, password: e.target.value })
                  }
                />
                <label htmlFor="email-3" className="field-label">
                  Confirm Password
                </label>
                <input
                  className="user_log_reg_fields w-input"
                  maxLength={256}
                  name="email-3"
                  data-name="Email 3"
                  placeholder=""
                  type="text"
                  id="email-3"
                  required=""
                  value={inputs.confirmPassword}
                  onChange={(e) =>
                    setInputs({ ...inputs, confirmPassword: e.target.value })
                  }
                />
                <div className="div-block-20 w-clearfix">
                  <div className="supporttext">Already Have an account?</div>
                  <Link
                    style={{ textDecoration: "none" }}
                    to="/signin"
                    className="field-label-forgot"
                  >
                    Click here
                  </Link>
                </div>
                {loading ? (
                  <div className="submit-button w-button d-flex justify-content-center">
                    <Spinner animation="border" />
                  </div>
                ) : (
                  <input
                    type="submit"
                    data-wait="Please wait..."
                    className="submit-button w-button"
                    value="Reset Password"
                  />
                )}
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
    //                         Reset Password
    //                     </Text>
    //                 </Box>
    //             </Flex>
    //             <div style={{ marginTop: "10px", padding: "3px" }}>
    //                 <Flex gap="1" style={{ marginTop: "4px" }} direction="column" className="Fieldset">
    //                     <label className="Label" htmlFor="password">
    //                         Password
    //                     </label>
    //                     <input value={inputs.password} onChange={(e) => setInputs({ ...inputs, password: e.target.value })} placeholder="******" radius="small" type="password" className="Input" id="password" />
    //                 </Flex>

    //                 <Flex gap="1" style={{ marginTop: "4px" }} direction="column" className="Fieldset">
    //                     <label className="Label" htmlFor="c-password">
    //                         Confirm Password
    //                     </label>
    //                     <input radius="small" type="password" className="Input" id="c-password" placeholder="******"
    //                         value={inputs.confirmPassword}
    //                         onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}
    //                     />
    //                 </Flex>
    //                 <Flex justify="between" style={{ marginTop: "5px" }} >
    //                     <Link to="/signup">new user</Link>
    //                     <Button onClick={resetPassword} radius="large" variant="soft">
    //                         Reset Password
    //                     </Button>
    //                 </Flex>
    //             </div>

    //         </Card>
    //     </Box>
    // </Flex>
  );
};

export default PasswordReset;
