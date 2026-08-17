import httpClient, { CATALOG_SERVICE_URL } from "./httpClient";

export const bookService = {
  getAll: async () => {
    const res = await httpClient.get("/books", CATALOG_SERVICE_URL);
    return res.data || [];
  },
  getByOwner: async (ownerId) => {
    const res = await httpClient.get(`/books/owner/${ownerId}`, CATALOG_SERVICE_URL);
    return res.data || [];
  },
  create: async (payload) => {
    const res = await httpClient.post("/books", payload, CATALOG_SERVICE_URL);
    return res.data;
  },
  update: async (id, payload) => {
    const res = await httpClient.put(`/books/${id}`, payload, CATALOG_SERVICE_URL);
    return res.data;
  },
  remove: async (id) => {
    const res = await httpClient.delete(`/books/${id}`, CATALOG_SERVICE_URL);
    return res.data;
  },
};