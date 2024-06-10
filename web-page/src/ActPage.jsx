import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Button } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import { db } from './firebase'; 
import { onSnapshot, collection, doc, getDoc } from 'firebase/firestore';
import './ActPage.css';

const ActPage = () => {
  const [uploadedImages, setUploadedImages] = useState([]);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const unsubscribe = onSnapshot(collection(db, 'activities'), (snapshot) => {
          const activitiesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          const sortedActivities = activitiesData.sort((a, b) => a.order - b.order);
          setActivities(sortedActivities);
        });
        return unsubscribe;
      } catch (error) {
        console.error('Error fetching activities:', error);
      }
    };

    const fetchImages = async () => {
      try {
        const imageDocRef = doc(db, 'actimage', 'uniqueId');
        const imageDocSnapshot = await getDoc(imageDocRef);

        if (imageDocSnapshot.exists()) {
          const imageUrl = imageDocSnapshot.data().url;
          setUploadedImages([imageUrl]);
        } else {
          console.log('No image found in actimage document with uniqueId');
        }
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    };

    fetchData();
    fetchImages();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('th-TH', options).replace(/(\d+)\s(\w+)\s(\d+)/, '$1 $2 $3');
    const [day, monthYear] = formattedDate.split(' ');
    return { day, monthYear: monthYear.replace(/\s+/g, ' ') };
  };

  return (
    <div style={{ margin: '180px 0', width: '100vw' }}>
      <div className='actFirst'>
        กิจกรรมทางวิชาการ
        <div style={{ borderBottom: '4px solid #1BB39B', width: '80px', margin: '10px 0' }}></div>
      </div>
      <Row>
        <Col sm={24} lg={12}>
          <div className='actPicture'>
            {uploadedImages.map((url, index) => (
              <img key={index} src={url} alt={`uploaded ${index}`} />
            ))}
          </div>
        </Col>
        <Col sm={24} lg={12}>
          {activities.map((activity) => {
            const { day, monthYear } = formatDate(activity.date);
            return (
              <div key={activity.id} className='activity'>
                <div className='dateMonth'>
                  {day}<br />
                  <span style={{ fontSize: '14px' }}>{monthYear}</span>
                </div>
                <div className='actName'>
                  {activity.name}
                  <br />
                  <span className='dateTime'>
                    <CalendarOutlined /> {new Date(activity.date).toLocaleDateString('th-TH')}
                  </span>
                  <br />
                  <Button type="primary" className='actButton'>
                    <Link to={`/activity/${activity.id}`}>{'ดูเพิ่มเติม >'}</Link>
                  </Button>
                </div>
              </div>
            );
          })}
        </Col>
      </Row>
    </div>
  );
};

export default ActPage;
