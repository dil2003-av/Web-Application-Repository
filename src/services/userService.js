import httpClient, { USER_SERVICE_URL } from "./httpClient";

export const userService = {
  getAll: async () => {
    const res = await httpClient.get("/users", USER_SERVICE_URL);
    return res.data || [];
  },
  create: async (payload) => {
    const res = await httpClient.post("/users", payload, USER_SERVICE_URL);
    return res.data;
  },
  update: async (id, payload) => {
    const res = await httpClient.put(`/users/${id}`, payload, USER_SERVICE_URL);
    return res.data;
  },
  remove: async (id) => {
    const res = await httpClient.delete(`/users/${id}`, USER_SERVICE_URL);
    return res.data;
  },
};