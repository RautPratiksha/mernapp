// frontend/src/components/FileUploader.js
import React, { useState } from 'react';
import axios from 'axios';

const FileUploader = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = {'file':file}
    // formData.append('file', file);
    console.log(file)


    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('File uploaded successfully!', response.data);
      // Handle success (e.g., show a success message)
    } catch (error) {
      console.error('Error uploading file:', error);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload File</button>
    </div>
  );
};

export default FileUploader;
