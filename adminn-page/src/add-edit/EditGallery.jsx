import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { db, storage } from '../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { ref, getDownloadURL, deleteObject, uploadBytes } from 'firebase/storage';
import DatePicker from 'react-datepicker';
import Sidebar from '../components/NavigationMenu';
import 'react-datepicker/dist/react-datepicker.css';
import './AddGallery.css';
import { Col, Row } from 'antd';

const EditGallery = () => {
  const { id } = useParams();
  const [imageName, setImageName] = useState('');
  const [imageDate, setImageDate] = useState(new Date());
  const [previewImageUrl, setPreviewImageUrl] = useState('');
  const [galleryImages, setGalleryImages] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, 'gallery', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setImageName(data.name);
          setImageDate(new Date(data.date));
          setPreviewImageUrl(data.imageUrl);

          if (data.images) {
            const images = await Promise.all(
              data.images.map(async (image) => {
                const imageUrl = await getDownloadURL(ref(storage, `images/${image}`));
                return { name: image, url: imageUrl };
              })
            );
            setGalleryImages(images);
          }
        }
      } catch (error) {
        console.error('Error fetching document:', error);
      }
    };

    fetchData();
  }, [id]);

  const handleProfileImageUpdate = (imageUrl) => {
    setPreviewImageUrl(imageUrl);
  };

  const handleSaveChanges = async () => {
    try {
      const updatedData = {
        name: imageName,
        date: imageDate.toISOString(),
        imageUrl: previewImageUrl,
      };

      await updateDoc(doc(db, 'gallery', id), updatedData);

      navigate('/gallery');
    } catch (error) {
      console.error('Error updating document:', error);
    }
  };

  const handleGalleryImageUpload = async (file) => {
    try {
      const storageRef = ref(storage, `images/${file.name}`);
      await uploadBytes(storageRef, file);
      const imageUrl = await getDownloadURL(storageRef);

      const docRef = doc(db, 'gallery', id);
      const docSnap = await getDoc(docRef);
      const currentImages = docSnap.exists() ? docSnap.data().images || [] : [];

      const updatedImages = [...currentImages, file.name];

      await updateDoc(docRef, { images: updatedImages });

      setGalleryImages((prevImages) => [
        ...prevImages,
        { name: file.name, url: imageUrl },
      ]);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleGalleryFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      await handleGalleryImageUpload(file);
    }
  };

  const handleDeleteImage = async (imageName) => {
    try {
      const storageRef = ref(storage, `images/${imageName}`);
      await deleteObject(storageRef);

      const docRef = doc(db, 'gallery', id);
      const docSnap = await getDoc(docRef);
      const currentImages = docSnap.exists() ? docSnap.data().images || [] : [];
      const updatedImages = currentImages.filter((image) => image !== imageName);

      await updateDoc(docRef, { images: updatedImages });

      setGalleryImages((prevImages) => prevImages.filter((image) => image.name !== imageName));
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  const handleCancel = () => {
    navigate('/gallery');
  };

  return (
    <div className="addGalleryContainer">
      <Sidebar />
      <div className='addGalleryContent'>
        <h2 className='addGalleryHead'>แก้ไขข้อมูลภาพกิจกรรม และแกลอรี่</h2>
        <div className="gMainUnderLine"></div>
        <Row>
          <Col lg={12}>
            <div className="galleryImages">
              {galleryImages.map((image, index) => (
                <div key={index} className="galleryImageContainer">
                  <img
                    src={image.url}
                    alt={image.name}
                    className="galleryImage"
                    style={{ width: '200px', height:'200px', cursor: 'pointer' }}
                    onClick={() => handleProfileImageUpdate(image.url)}
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
            <div className="imagePlaceholder">
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
              id="newFileInput"
              onChange={handleGalleryFileChange}
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
                onClick={handleSaveChanges}
              >
                บันทึก
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

export default EditGallery;
