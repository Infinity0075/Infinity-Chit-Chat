import { axiosIntance } from "./axios";

export const signup = async (signupData) => {
  const response = await axiosIntance.post("/auth/signup", signupData);
  return response.data;
};

export const login = async (loginData) => {
  const response = await axiosIntance.post("/auth/login", loginData);
  return response.data;
};
export const logout = async () => {
  const response = await axiosIntance.post("/auth/logout");
  return response.data;
};

export const getAuthUser = async () => {
  try {
    const res = await axiosIntance.get("/auth/me");
    return res.data;
  } catch (error) {
    console.log("Error in getting User", error);
    return null;
  }
};

export const completeOnboarding = async (userData) => {
  const res = await axiosIntance.post("/auth/onboarding", userData);
  return res.data;
};
