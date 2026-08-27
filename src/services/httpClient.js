// GCP Load Balancer Base URL (HTTPS)
// GCP Load Balancer Base URL (HTTPS)
const GCP_LOAD_BALANCER_URL = "https://34.54.64.26";

// Base URLs routed via API Gateway
export const USER_SERVICE_URL = `${GCP_LOAD_BALANCER_URL}/api`;
export const CATALOG_SERVICE_URL = `${GCP_LOAD_BALANCER_URL}/api`;

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