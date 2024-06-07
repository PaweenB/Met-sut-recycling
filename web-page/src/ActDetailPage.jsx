import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from "firebase/firestore";
import { db } from './firebase';
import { CalendarOutlined } from '@ant-design/icons';
import './ActDetailPage.css'
import { Col, Row } from 'antd';

const ActDetailPage = () => {
  const { id } = useParams();
  const [activity, setActivity] = useState(null);
  const [error, setError] = useState(null);
  const [imageURL, setImageURL] = useState('');

  const fetchActivityDetail = async () => {
    try {
      const docRef = doc(db, "activities", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setActivity(data);
        // Set image URL
        if (data.imageURL) {
          setImageURL(data.imageURL);
        }
      } else {
        setError("No such document!");
      }
    } catch (e) {
      console.error("Error fetching document: ", e);
      setError("Error fetching document");
    }
  };

  useEffect(() => {
    fetchActivityDetail();
  }, [id]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!activity) {
    return <div>Loading...</div>;
  }

  console.log("Activity data:", activity);

  return (
    <div className="actDetail">
      <div style={{ fontSize: '32px', color: '#1BB39B', fontWeight: 'bold', margin: '40px 0 0 30px' }}>
        กิจกรรมทางวิชาการ
        <div style={{ borderBottom: '4px solid #1BB39B', width: '80px', margin: '10px 0' }}></div>
      </div>
      
      <p className='actDetailName'>
        {activity.name} {' '} 
      </p>
      <span className='dateTime actDetailTime'>
          <CalendarOutlined /> {new Date(activity.date).toLocaleDateString('th-TH')}
        </span>
      <div style={{ borderBottom: '1px solid #1BB39B', width: '1145px', margin: '30px 140px' }}></div>
      <Row>
        <Col lg={12}>
            {imageURL && <img src={imageURL} className="actDetailImg" />}
        </Col>
        <Col lg={12}>
            <div className="actDescription">
                <h3>คำอธิบายกิจกรรม</h3>
                <p>{activity.description}</p>
            </div>
        </Col>
      </Row>
    </div>
  );
};

export default ActDetailPage;
