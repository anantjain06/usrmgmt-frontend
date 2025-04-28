import React, { useState } from "react";
import axios from "axios";
import { API_ENDPOINTS } from "../config/ApiConstant";

const FileScreen = () => {
    const [file, setFile] = useState(null);
    const CHUNK_SIZE = 5 * 1024 * 1024; // 5MB chunk size
    const [uploadProgress, setUploadProgress] = useState(0);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const uploadChunks = async () => {
        if (!file) return;
    
        const totalChunks = Math.ceil(file.size / CHUNK_SIZE);
        let start = 0;
    
        for (let chunkIndex = 0; chunkIndex < totalChunks; chunkIndex++) {
          const chunk = file.slice(start, start + CHUNK_SIZE);
          const formData = new FormData();
          formData.append("file", chunk);
          formData.append("filename", file.name);
          formData.append("chunkIndex", String(chunkIndex));
          formData.append("totalChunks", String(totalChunks));
    
          try {
            await axios.post(API_ENDPOINTS.FileUpload, formData);
            setUploadProgress(((chunkIndex + 1) / totalChunks) * 100);
          } catch (error) {
            console.error("Upload failed", error);
            return;
          }
    
          start += CHUNK_SIZE;
        }
    
        // Notify backend to merge chunks
        await axios.post(API_ENDPOINTS.FileMerge, { filename: file.name });
        alert("Upload completed!");
      };
    
  return (
      <div>
            <h1>Welcome to the File Screen</h1>
            <input type="file" onChange={handleFileChange} />
            <button onClick={uploadChunks}>Upload</button>
                <div style={{ width: "100%", marginTop:'10px', backgroundColor: "#ddd", borderRadius: "5px", overflow: "hidden" }}>
                          <div
                              style={{
                                  width: `${uploadProgress}%`,
                                  height: "10px",
                                  backgroundColor: "#4caf50",
                                  transition: "width 0.3s ease-in-out",
                              }}
                          ></div>
                </div>
                <p>{uploadProgress.toFixed(2)}%</p>
      </div>                        
  );
};

export default FileScreen;