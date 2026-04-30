import { createBrowserRouter } from "react-router-dom";
import { LandingPage } from "./components/LandingPage";
import { ChatInterface } from "./components/ChatInterface";
import SignUp from "./components/SignUp";
import Login from "./components/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LandingPage,
  },
  {
    path: "/interview/:categoryId",
    Component: ChatInterface,
  },
  {
    path: "/signup",
    Component: SignUp,
  },
  {
    path: "/login",
    Component: Login,
  },
]);
