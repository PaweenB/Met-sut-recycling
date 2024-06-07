import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { db, storage } from '../firebase';
import { addDoc, collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import DatePicker from 'react-datepicker';
import Sidebar from '../components/NavigationMenu';
import 'react-datepicker/dist/react-datepicker.css';
import './AddGallery.css';
import { Col, Row } from 'antd';

const AddGallery = () => {
  const [imageName, setImageName] = useState('');
  const [imageDate, setImageDate] = useState(new Date());
  const [previewImageUrl, setPreviewImageUrl] = useState('');
  const [galleryImages, setGalleryImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const navigate = useNavigate();

  const handleGalleryImageUpload = async (file) => {
    try {
      const storageRef = ref(storage, `images/${file.name}`);
      await uploadBytes(storageRef, file);
      const imageUrl = await getDownloadURL(storageRef);

      setGalleryImages((prevImages) => [
        ...prevImages,
        { name: file.name, url: imageUrl },
      ]);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      await handleGalleryImageUpload(file);
    }
  };

  const handleImageSelection = (image) => {
    setSelectedImage(image);
    setPreviewImageUrl(image.url);
  };

  const handleDeleteImage = async (imageName) => {
    try {
      const storageRef = ref(storage, `images/${imageName}`);
      await deleteObject(storageRef);

      setGalleryImages((prevImages) => prevImages.filter((image) => image.name !== imageName));
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  const handleImageUpload = async () => {
    try {
      let imageUrl = selectedImage ? selectedImage.url : '';

      // Fetch current number of gallery items to determine the order
      const snapshot = await getDocs(collection(db, 'gallery'));
      const order = snapshot.size;

      const galleryRef = await addDoc(collection(db, 'gallery'), {
        name: imageName,
        date: imageDate.toISOString(),
        imageUrl: imageUrl,
        order: order,
        images: galleryImages.map((img) => img.name)
      });

      setImageName('');
      setImageDate(new Date());
      setPreviewImageUrl('');
      setGalleryImages([]);
      setSelectedImage(null);
      navigate('/gallery');
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleCancel = () => {
    navigate('/gallery');
  };

  return (
    <div className="addGalleryContainer">
      <Sidebar />
      <div className='addGalleryContent'>
        <h2 className='addGalleryHead'>เพิ่มข้อมูลภาพกิจกรรม และแกลอรี่</h2>
        <div className="gMainUnderLine"></div>
        <Row>
          <Col lg={12}>
            <div className="galleryImages">
              {galleryImages.map((image, index) => (
                <div key={index} className="galleryImageContainer">
                  <img
                    src={image.url}
                    alt={image.name}
                    className={`galleryImage ${selectedImage?.name === image.name ? 'selected' : ''}`}
                    style={{ width: '200px', height:'200px', cursor: 'pointer' }}
                    onClick={() => handleImageSelection(image)}
                  />
                  <button onClick={() => handleDeleteImage(image.name)} className="deleteButton">X</button>
                </div>
              ))}
            </div>
          </Col>
          <Col lg={12}>
            <div className="uploadButtonContainer">
              <h2 className='imgHead'>รูปภาพ</h2>
              <button
                className="uploadButton"
                onClick={() => document.getElementById('newFileInput').click()}
              >
                +เพิ่มรูป
              </button>
            </div>
            <h2 className='gImgExample'>พื้นที่แสดงรูปภาพตัวอย่าง</h2>
            <div
              className="imagePlaceholder"
              onClick={() => document.getElementById('fileInput').click()}
            >
              {previewImageUrl ? (
                <img src={previewImageUrl} alt="Preview" className="uploadedImage" />
              ) : (
                <div className="placeholderText"></div>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              id="fileInput"
              onChange={handleFileChange}
            />
            <input
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              id="newFileInput"
              onChange={handleFileChange}
            />
            <h2 className='gImgExample'>ชื่อกิจกรรม</h2>
            <input
              type="text"
              className='input-field'
              value={imageName}
              onChange={(e) => setImageName(e.target.value)}
            />
            <h2 className='gImgExample'>วันที่</h2>
            <DatePicker
              className='input-field'
              selected={imageDate}
              onChange={(date) => setImageDate(date)}
              dateFormat="dd/MM/yyyy"
            /><br />
            <div className="buttonGroup">
              <button
                style={{ backgroundColor: '#1BB39B', fontSize: '16px', marginTop: '30px' }}
                onClick={handleImageUpload}
              >
                สร้าง
              </button>
              <button
                style={{ backgroundColor: '#ff4d4f', fontSize: '16px', marginTop: '30px', marginRight: '500px' }}
                onClick={handleCancel}
              >
                ยกเลิก
              </button>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default AddGallery;
