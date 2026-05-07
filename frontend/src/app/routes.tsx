import { createBrowserRouter } from "react-router-dom";

import { LandingPage } from "./components/LandingPage";
import { ChatInterface } from "./components/ChatInterface";

import SignUp from "./components/SignUp";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LandingPage,
  },

  {
    path: "/signup",
    Component: SignUp,
  },

  {
    path: "/login",
    Component: Login,
  },

  {
    path: "/interview/:categoryId",
    element: (
      <ProtectedRoute>
        <ChatInterface />
      </ProtectedRoute>
    ),
  },
]);