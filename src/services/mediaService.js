// GCP Load Balancer Base URL (HTTPS)
const GCP_LOAD_BALANCER_URL = "http://136.85.120.43:8083";

// API Gateway routed Media Endpoint
const MEDIA_API_URL = `${GCP_LOAD_BALANCER_URL}/api/media`;

export const uploadMedia = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${MEDIA_API_URL}/upload`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Failed to upload image");
  }

  const data = await res.json();
  return data.fileUrl; // GCP Bucket URL එක සෘජුවම return කරයි
};

export const getMediaById = async (id) => {
  const res = await fetch(`${MEDIA_API_URL}/${id}`);
  if (!res.ok) {
    throw new Error("Failed to get media");
  }
  return await res.json();
};

export const mediaService = {
  upload: uploadMedia,
  getById: getMediaById,
};

export default mediaService;