import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import HomePage from "./pages/HomePage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import Notification from "./pages/Notification.jsx";
import OnBoardingPage from "./pages/OnBoardingPage.jsx";
import ChatPage from "./pages/ChatPage.jsx";
import CallPage from "./pages/CallPage.jsx";
import { Toaster } from "react-hot-toast";
import { axiosIntance } from "./lib/axios.js";
import PageLoader from "./components/PageLoader.jsx";

const App = () => {
  const { data: authData, isLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      const res = await axiosIntance.get("/auth/me");
      return res.data;
    },
    retry: false,
  });

  // console.log(authData);
  const authUser = authData?.user;

  if (isLoading) return <PageLoader />;

  return (
    <div className="h-screen" data-theme="night">
      <Routes>
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignupPage /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route
          path="/notification"
          element={authUser ? <Notification /> : <Navigate to="/login" />}
        />
        <Route
          path="/onboarding"
          element={authUser ? <OnBoardingPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/chat"
          element={authUser ? <ChatPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/call"
          element={authUser ? <CallPage /> : <Navigate to="/login" />}
        />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
