import axios from "./axios";
import * as ApiEndpoint from "./ApiEndPoints";

export const RegisterService = async (data) => {
  return await axios.post(ApiEndpoint.AUTH_REGISTER_ENDPOINT, data);
};

export const LoginService = async (data) => {
  return await axios.post(ApiEndpoint.AUTH_LOGIN_ENDPOINT, data);
};
