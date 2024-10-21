import "./App.css";
import Toolbar from "./pages/Toolbar";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import { Navigate, Route, Routes } from "react-router-dom";
import PublicRoute from "./routes/Public";
import PrivateRoute from "./routes/Private";
import { Toaster } from "react-hot-toast";
import EmailVerify from "./pages/ForgotPassword/EmailVerify";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import PasswordReset from "./pages/ForgotPassword/PasswordReset";
import EmailVerifyAlert from "./pages/ForgotPassword/EmailVerifyAlert";
import Pricing from "./pages/Pricing/Pricing";
import { Theme } from "@radix-ui/themes";
import Menubars from "./components/Menubar/Menubar";
import Profile from "./pages/Profile/Profile";
import Grammerly from "./pages/Grammerly";
import Translate from "./pages/Translate/Translate";
import Summery from "./pages/Summery/Summery";
import Paragrism from "./pages/Paragrism/Paragrism";
import GrammerlyNew from "./pages/FinalToolbar/GrammerlyNew";

function App() {
  return (
    <>
      {/* <Toolbar /> */}
      {/* <Login /> */}

      <Routes>
        <Route path="/" element={<PublicRoute />}>
          <Route path="/" element={<Navigate replace to="/signin" />} />
          <Route
            path="/signup"
            element={
              <Register />
            }
          />

          <Route
            path="/signin"
            element={
              <Login />
            }
          />

          <Route
            path="/verify"
            element={
                <EmailVerify />
            }
          />
          <Route
            path="/forget-password"
            element={
              <Theme
                appearance="dark"
                accentColor="crimson"
                grayColor="sand"
                radius="large"
                scaling="95%"
              >
                <ForgotPassword />
              </Theme>
            }
          />
          <Route
            path="/reset-password"
            element={
                <PasswordReset />
            }
          />
          <Route
            path="/email-verification"
            element={
                <EmailVerifyAlert />
            }
          />
        </Route>
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/" element={<Menubars />}>
            <Route path="/" element={<Navigate replace to="/dashboard" />} />
            <Route path="/dashboard" element={<GrammerlyNew />} />
            {/* <Route path="/translate" element={<Translate />} />
            <Route path="/summery" element={<Summery />} />
            <Route path="/paragrism" element={<Paragrism />} /> */}
            {/* <Route path="/dashboard" element={<Toolbar />} /> */}
            <Route
              path="/pricing"
              element={
                <Theme
                  appearance="light"
                  accentColor="crimson"
                  grayColor="sand"
                  radius="large"
                  scaling="100%"
                >
                  <Pricing />
                </Theme>
              }
            />
            <Route path="/profile" element={
              <Theme
                appearance="light"
                accentColor="crimson"
                grayColor="sand"
                radius="large"
                scaling="100%"
              >
                <Profile />
              </Theme>
            } />

          </Route>

        </Route>
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
