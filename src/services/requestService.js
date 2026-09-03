
// API Gateway routed Requests Endpoint
const REQUEST_API_URL ="http://136.85.120.43:8081/api/requests";

export const getRequests = async () => {
  const res = await fetch(REQUEST_API_URL);
  if (!res.ok) throw new Error("Failed to fetch requests");
  return await res.json();
};

export const createRequest = async (payload) => {
  const res = await fetch(REQUEST_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create request");
  return await res.json();
};

export const updateRequestStatus = async (id, status) => {
  const res = await fetch(`${REQUEST_API_URL}/${id}/status?status=${status}`, {
    method: "PUT",
  });
  if (!res.ok) throw new Error("Failed to update status");
  return await res.json();
};

// BookLoopContext එකට අවශ්‍ය requestService Object එක export කිරීම
export const requestService = {
  getAll: getRequests,
  create: createRequest,
  updateStatus: updateRequestStatus,
};

export default requestService;