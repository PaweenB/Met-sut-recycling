import React, { useState, useEffect } from 'react';
import { Row, Col, Button } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './GalleryPage.css';
import { db, storage } from './firebase';
import { getDownloadURL, ref } from 'firebase/storage';
import { onSnapshot, collection } from 'firebase/firestore';

const GalleryPage = () => {
  const [gallery, setGallery] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const unsubscribe = onSnapshot(collection(db, 'gallery'), async (snapshot) => {
          const imageData = await Promise.all(snapshot.docs.map(async (doc) => {
            const data = doc.data();
            const imageUrl = await getDownloadURL(ref(storage, data.imageUrl));
            return { id: doc.id, ...data, imageUrl };
          }));

          // Sort the gallery items by order
          imageData.sort((a, b) => a.order - b.order);
          
          setGallery(imageData);
        });
        return unsubscribe;
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchGallery();
  }, []);

  return (
    <div style={{ margin: '50px 0' }}>
      <Row>
        <Col span={24}>
          <div>
            <img className='galleryBanner' src="./images/image51.png" alt="Banner"/>
            <div className="gImageOverlay">
              <p className="goverlayText1">ชื่อเกี่ยวกับรูปภาพชื่อเกี่ยวกับรูปภาพชื่อเกี่ยวกับรูปภาพ</p>
              <p className='goverlayText2'>{'<วันที่ เวลา>'}</p>
            </div>
          </div>
        </Col>
      </Row>

      <div>
        <p className='HeadWord' style={{ margin: '90px 0 0 30px' }}>
          ภาพกิจกรรมและแกลอรี่
          <div style={{ borderBottom: '4px solid #1BB39B', width: '80px', margin: '10px 0' }}></div>
        </p>
        {gallery.map((activity, index) => (
          <div key={index} style={{ margin: '50px 10px 0 80px', display: 'flex' }}>
            <img className='galleryImg' src={activity.imageUrl} alt={activity.name} />
            <div className='imgName'>
              {activity.name}
              <br />
              <span
                style={{
                  fontSize: '14px',
                  color: '#1BB39B',
                }}
              >
                <CalendarOutlined /> {new Date(activity.date).toLocaleDateString('th-TH')}
              </span>
            </div>
            <Button className='imgButton' onClick={() => navigate(`/gallery/${activity.id}`)}>{'ดูเพิ่มเติม >'}</Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryPage;
