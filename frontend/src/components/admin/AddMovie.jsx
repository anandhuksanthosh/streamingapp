import React, { useState } from "react";
import styles from "./AddMovie.module.css";

const AddMovie = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("video")) {
      setVideoFile(file);
      setVideoPreview(URL.createObjectURL(file));
    } else {
      alert("Please select a valid video file.");
    }
  };

  const handleUpload = () => {
    if (!title || !description || !videoFile) {
      alert("All fields are required!");
      return;
    }

    // Perform upload logic here
    alert("Movie uploaded successfully!");
  };

  return (
    <div className={styles.container}>
      <h1>Add Movie</h1>
      {/* Title Input */}
      <input
        type="text"
        placeholder="Title of the movie"
        className={styles.input}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* Description Input */}
      <textarea
        placeholder="Description of the movie"
        className={styles.textarea}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>

      {/* File Input */}
      <input
        type="file"
        accept="video/*"
        className={styles.fileInput}
        onChange={handleFileChange}
      />

      {/* Video Preview */}
      {videoPreview && (
        <div className={styles.videoPreview}>
          <video controls>
            <source src={videoPreview} type={videoFile.type} />
            Your browser does not support the video tag.
          </video>
        </div>
      )}

      {/* Upload Button */}
      <button className={styles.uploadButton} onClick={handleUpload}>
        Upload Movie
      </button>
    </div>
  );
};

export default AddMovie;
