import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CalendarOutlined } from '@ant-design/icons';
import { doc, getDoc } from 'firebase/firestore';
import { db, storage } from './firebase';
import { ref, getDownloadURL } from 'firebase/storage';
import { Col, Row } from 'antd';
import './GalleryDetailPage.css';

const GalleryDetailPage = () => {
  const { id } = useParams();
  const [gallery, setGallery] = useState(null);
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);

  const fetchGalleryDetail = async () => {
    try {
      const docRef = doc(db, 'gallery', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setGallery(data);

        if (data.images) {
          const imageUrls = await Promise.all(
            data.images.map(async (imageName) => {
              const url = await getDownloadURL(ref(storage, `images/${imageName}`));
              return { name: imageName, url };
            })
          );
          setImages(imageUrls);
        }
      } else {
        setError('No such document!');
      }
    } catch (e) {
      console.error('Error fetching document: ', e);
      setError('Error fetching document');
    }
  };

  useEffect(() => {
    fetchGalleryDetail();
  }, [id]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!gallery) {
    return <div>Loading...</div>;
  }

  return (
    <div className="galleryDetail">
      <div style={{ fontSize: '32px', color: '#1BB39B', fontWeight: 'bold', margin: '40px 0 0 30px' }}>
        รายละเอียดภาพกิจกรรม
        <div style={{ borderBottom: '4px solid #1BB39B', width: '80px', margin: '10px 0' }}></div>
      </div>
      <p className='galleryDetailName'>{gallery.name}</p>
      <div className='galleryDetailDate' style={{ display: 'flex', alignItems: 'center', fontSize: '14px', color: '#1BB39B' }}>
        <CalendarOutlined style={{ marginRight: '5px' }} />
        <p style={{ margin: 0 }}>{new Date(gallery.date).toLocaleDateString('th-TH')}</p>
      </div>
      <div className='galleryDetailUnderLine'></div>
      <Row>
        <Col lg={10} sm={24}>
          <div className="galleryImages">
            {images.map((image, index) => (
              <div key={index} className="galleryImageContainer">
                <img src={image.url} alt={image.name} className="galleryImage" />
              </div>
            ))}
          </div>
        </Col>
        <Col lg={14} sm={24} style={{ paddingLeft: '50px' }}>
          <img src={gallery.imageUrl} className="galleryDetailImg" alt={gallery.name} />
        </Col>
      </Row>
    </div>
  );
};

export default GalleryDetailPage;
