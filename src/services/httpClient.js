// Base URLs for Different Microservices
export const USER_SERVICE_URL = "http://localhost:8081/api";
export const CATALOG_SERVICE_URL = "http://localhost:8082/api";

export const httpClient = {
  get: async (url, baseUrl = USER_SERVICE_URL) => {
    const res = await fetch(`${baseUrl}${url}`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return { data: await res.json() };
  },
  post: async (url, payload, baseUrl = USER_SERVICE_URL) => {
    const res = await fetch(`${baseUrl}${url}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return { data: await res.json() };
  },
  put: async (url, payload, baseUrl = USER_SERVICE_URL) => {
    const res = await fetch(`${baseUrl}${url}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return { data: await res.json() };
  },
  delete: async (url, baseUrl = USER_SERVICE_URL) => {
    const res = await fetch(`${baseUrl}${url}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return { data: await res.json() };
  },
};

export const api = httpClient;
export default httpClient;