// frontend/src/components/FileList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FileList = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get('http://localhost:5000/files');
        setFiles(response.data);
      } catch (error) {
        console.error('Error fetching files:', error);
      }
    };
    fetchFiles();
  }, []);

  const handleDelete = async (fileId) => {
    try {
      await axios.delete(`http://localhost:5000/files/${fileId}`);
      setFiles(files.filter(file => file._id !== fileId));
      console.log('File deleted successfully!');
      // Handle success (e.g., update file list)
    } catch (error) {
      console.error('Error deleting file:', error);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <ul>
      {files.map((file) => (
        <li key={file._id}>
          <span>{file.name}</span>
          <button onClick={() => handleDelete(file._id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default FileList;
