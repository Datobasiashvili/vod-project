import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

function App() {
  const [videos, setVideos] = useState([]);

  const getVideo = async () => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/video`);
    if (response) setVideos(response.data.videos);
  };

  useEffect(() => {
    getVideo();
  }, []);

  return (
    <>
      <>
        {videos.map((video) => (
          <div key={video._id}>
            <h3>{video.title}</h3>
            <p>{video.description}</p>
            <video
              src={video.videoUrl}
              poster={video.thumbnailUrl}
              controls
              playsInline
              preload="metadata"
              width="600"
              onPlay={() =>
                axios.post(`${import.meta.env.VITE_API_URL}/api/video/${video._id}/view`)
              }
            />
          </div>
        ))}
      </>
    </>
  );
}

export default App;
