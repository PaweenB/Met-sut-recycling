import React, { useState } from 'react';
import { Upload } from 'antd';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase';

const { Dragger } = Upload;

const UploadImage = ({ onImageUpload }) => {
  const [imageUrl, setImageUrl] = useState(null);

  const handleUpload = async ({ file, onSuccess }) => {
    try {
      const fileName = `${Date.now()}_${file.name}`;
      const fileRef = ref(storage, fileName);
      await uploadBytes(fileRef, file);
      const downloadURL = await getDownloadURL(fileRef);
      setImageUrl(downloadURL);
      onImageUpload(downloadURL);
      onSuccess(null, file); 
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div style={{ width: '176px', textAlign: 'center' }}>
      <Dragger
        name="file"
        customRequest={handleUpload}
        showUploadList={false}
        beforeUpload={() => false}
      >
        <p className="ant-upload-drag-icon"></p>
        <p className="ant-upload-text">แก้ไข</p>
      </Dragger>
      {imageUrl && <img src={imageUrl} alt="Uploaded" style={{ maxWidth: '100%', maxHeight: '100%' }} />} {/* Display the uploaded image */}
    </div>
  );
};

export default UploadImage;
