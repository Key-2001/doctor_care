import axios from "./axios";
import * as ApiEndpoint from "./ApiEndPoints";
import { token } from "../config";

export const getProfileUserService = async () => {
  return await axios.get(ApiEndpoint.USER_PROFILE_ENDPOINT, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getAppointmentsUserService = async () => {
  return await axios.get(ApiEndpoint.USER_APPOINTMENTS_ENDPOINT, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateProfileUserService = async (id, data) => {
  return await axios.put(`/users/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
