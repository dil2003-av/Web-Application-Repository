import Card from "../components/common/Card";
import { useBookLoop } from "../context/BookLoopContext";

export default function MediaPage() {
  const {
    busy,
    setMediaFile,
    uploadedMedia,
    uploadMedia,
    mediaId,
    setMediaId,
    mediaRecord,
    getMediaById,
  } = useBookLoop();

  const onUpload = (event) => {
    event.preventDefault();
    uploadMedia();
  };

  return (
    <div className="grid two-col">
      <form onSubmit={onUpload} className="card">
        <h3>Upload Media</h3>
        <label>
          Choose file
          <input
            type="file"
            onChange={(e) => setMediaFile(e.target.files?.[0] || null)}
            required
          />
        </label>
        <button disabled={busy} type="submit">
          Upload
        </button>
        {uploadedMedia && (
          <div className="result-box">
            <p>
              <strong>Uploaded:</strong> {uploadedMedia.fileName}
            </p>
            <p>Media ID: {uploadedMedia.id}</p>
            <p>URL: {uploadedMedia.fileUrl}</p>
          </div>
        )}
      </form>

      <Card>
        <h3>Get Media by ID</h3>
        <div className="row">
          <input
            placeholder="Media ID"
            value={mediaId}
            onChange={(e) => setMediaId(e.target.value)}
          />
          <button disabled={busy} onClick={getMediaById}>
            Fetch
          </button>
        </div>
        {mediaRecord ? (
          <div className="result-box">
            <p>
              <strong>{mediaRecord.fileName}</strong>
            </p>
            <p>Type: {mediaRecord.fileType}</p>
            <p>Size: {mediaRecord.fileSize}</p>
            <p>URL: {mediaRecord.fileUrl}</p>
          </div>
        ) : (
          <p className="muted">No media selected yet.</p>
        )}
      </Card>
    </div>
  );
}
