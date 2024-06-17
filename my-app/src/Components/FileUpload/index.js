// src/FileUpload.js

import React, { useState, useEffect, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

const FileUpload = () => {
  const [showUploadBtn, setShowUploadBtn] = useState(false);
  const [uploadMessage, setUploadMessage] = useState();
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    setSelectedFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop: (acceptedFiles) => {
        // Handle the accepted files here
        if(acceptedFiles?.length===0){
            setUploadMessage(<div><b>Note:</b> Only Excel Files (.xlsx) are allowed</div>);
        } else {
            setUploadMessage(<div>You have dropped "{acceptedFiles?.map((file, index) => {
                return (<span key={file?.name}>{file?.name} {index < acceptedFiles.length - 1 && ', '}</span>);
              })}" {acceptedFiles?.length>1?(<span>Files</span>):(<span>File</span>)}</div>);
            setShowUploadBtn(true);
            setSelectedFile(acceptedFiles);
        }
        console.log("accepted Files", acceptedFiles);
    },
    accept: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      },  // Correct MIME type for CSV files  // Only accept CSV files
  });

  useEffect(()=>{
    console.log("selectedFile", selectedFile);
  },[selectedFile]);

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please select a file to upload');
      return;
    }
    console.log("selectedFile [handleUpload]", selectedFile);
    const formData = new FormData();
    formData.append('file', selectedFile[0]);

    setUploading(true);

    try {
      const response = await axios.post('http://localhost:7000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('File uploaded successfully');
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <div {...getRootProps()} style={dropzoneStyle}>
        <input {...getInputProps()} />
        {
          isDragActive ?
            <p>Drop the files here ...</p> :
            <p>Drag 'n' drop a CSV file here, or click to select a file</p>
        }
      </div>
      <div>
        <div>{uploadMessage}</div>
        {showUploadBtn && <button className="btn btn-writewise" onClick={handleUpload} disabled={uploading}>
            {uploading ? 'Uploading...' : 'Upload Files to Server'}
        </button>}
      </div>
    </div>
  );
};

const dropzoneStyle = {
  border: '2px dashed #cccccc',
  borderRadius: '5px',
  width:'100%',
  height:'300px',
  display:'flex',
  justifyContent:'center',
  alignItems:'center',
  padding: '20px',
  textAlign: 'center',
  cursor: 'pointer',
  margin: '10px 0'
};

export default FileUpload;
