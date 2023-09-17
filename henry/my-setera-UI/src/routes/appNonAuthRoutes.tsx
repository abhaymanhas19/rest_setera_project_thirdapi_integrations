import { RouteType } from "./config";
import LoginPage from "../pages/Login/LoginPage";
import ForgetPasswordPage from "../pages/ForgetPassword/ForgetPassword";
import ResetPasswordPage from "../pages/ResetPassword/ResetPassword";

const appAuthRoutes: RouteType[] = [
  {
    index: true,
    element: <LoginPage />,
    state: "Login"
  },
  {
    path: "/forgotpass",
    element: <ForgetPasswordPage />,
    state: "ForgetPassword"
  },
  {
    path: "/confirm/:customToken",
    element: <ResetPasswordPage />,
    state: "ResetPassword"
  },
];

export default appAuthRoutes;