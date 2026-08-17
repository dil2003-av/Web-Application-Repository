const MEDIA_API_URL = "http://localhost:8083/api/media"; // Port 8083 (Media Service)

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
  return `http://localhost:8083${data.fileUrl}`;
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