const GCP_VM_USER_SERVICE = "http://136.85.120.43:8081/api";
const GCP_VM_CATALOG_SERVICE = "http://136.85.120.43:8082/api";

export const USER_SERVICE_URL = GCP_VM_USER_SERVICE;
export const CATALOG_SERVICE_URL = GCP_VM_CATALOG_SERVICE;

export const httpClient = {
  get: async (url, baseUrl = USER_SERVICE_URL) => {
    const endpoint = url.startsWith("/") ? url : `/${url}`;
    const res = await fetch(`${baseUrl}${endpoint}`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return { data: await res.json() };
  },
  post: async (url, payload, baseUrl = USER_SERVICE_URL) => {
    const endpoint = url.startsWith("/") ? url : `/${url}`;
    const res = await fetch(`${baseUrl}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return { data: await res.json() };
  },
  put: async (url, payload, baseUrl = USER_SERVICE_URL) => {
    const endpoint = url.startsWith("/") ? url : `/${url}`;
    const res = await fetch(`${baseUrl}${endpoint}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return { data: await res.json() };
  },
  delete: async (url, baseUrl = USER_SERVICE_URL) => {
    const endpoint = url.startsWith("/") ? url : `/${url}`;
    const res = await fetch(`${baseUrl}${endpoint}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return { data: await res.json() };
  },
};

export const api = httpClient;
export default httpClient;


// const GCP_VM_GATEWAY = "http://136.85.120.43:8080";

// // Base URLs for Gateway
// export const USER_SERVICE_URL = GCP_VM_GATEWAY;
// export const CATALOG_SERVICE_URL = GCP_VM_GATEWAY;

// export const httpClient = {
//   get: async (url, baseUrl = USER_SERVICE_URL) => {
//     const endpoint = url.startsWith("/") ? url : `/${url}`;
//     const res = await fetch(`${baseUrl}${endpoint}`);
//     if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
//     return { data: await res.json() };
//   },
//   post: async (url, payload, baseUrl = USER_SERVICE_URL) => {
//     const endpoint = url.startsWith("/") ? url : `/${url}`;
//     const res = await fetch(`${baseUrl}${endpoint}`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(payload),
//     });
//     if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
//     return { data: await res.json() };
//   },
//   put: async (url, payload, baseUrl = USER_SERVICE_URL) => {
//     const endpoint = url.startsWith("/") ? url : `/${url}`;
//     const res = await fetch(`${baseUrl}${endpoint}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(payload),
//     });
//     if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
//     return { data: await res.json() };
//   },
//   delete: async (url, baseUrl = USER_SERVICE_URL) => {
//     const endpoint = url.startsWith("/") ? url : `/${url}`;
//     const res = await fetch(`${baseUrl}${endpoint}`, {
//       method: "DELETE",
//     });
//     if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
//     return { data: await res.json() };
//   },
// };

// export const api = httpClient;
// export default httpClient;