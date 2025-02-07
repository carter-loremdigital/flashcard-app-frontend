// src/api/auth.ts
import api from "./index";

export interface AuthResponse {
  access: string;
  refresh: string;
}

// Login: calls Django’s JWT endpoint at `/api/token/`
export const loginUser = async (
  username: string,
  password: string
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>("/token/", {
    username,
    password,
  });
  return response.data;
};

// Signup: Calls custom Django endpoint at `/api/signup/`
export const signupUser = async (
  username: string,
  password: string
): Promise<any> => {
  const response = await api.post("/signup/", { username, password });
  return response.data;
};
