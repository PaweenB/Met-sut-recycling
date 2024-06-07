import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import { PictureOutlined, PlayCircleOutlined } from '@ant-design/icons';
import { db } from './firebase'; // Make sure to adjust the path if necessary
import { getDoc, doc } from 'firebase/firestore';
import './AbusPage.css';

const AbusPage = () => {
  const [aboutData, setAboutData] = useState({
    logoURL: '',
    orgNameEn: '',
    orgNameTh: '',
    history: '',
    video: '',
    videoName: '',
    videoDescription: '',
    objective: '',
  });

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const docRef = doc(db, 'about', 'information');
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setAboutData(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document: ", error);
      }
    };

    fetchAboutData();
  }, []);

  return (
    <div style={{ margin: '100px 0', width: '100vw', display: 'flex', flexDirection: 'column' }}>
      <div className='abusFirst'>
        เกี่ยวกับเรา
        <div style={{ borderBottom: '4px solid #1BB39B', width: '80px', margin: '10px 0' }}></div>
      </div>
      <div style={{ display: 'flex' }}>
        <img src={aboutData.logoURL } className='abusIcon' />
        <div className='mainWord'>
          {aboutData.orgNameEn }
          <br />
          <span className='subWord'>
            {aboutData.orgNameTh }
          </span>
          <div style={{ borderBottom: '2px solid #1BB39B', width: '1000px', margin: '40px 0' }}></div>
        </div>
      </div>
      <Row>
        <Col sm={24} lg={10}>
          <div className='historyImg'>
            <img src={aboutData.historyImageURL} className='insideHistortImg'  />
          </div>
        </Col>
        <Col sm={24} lg={14} className='borderHistory'>
          <div className='mainHistory'>
            ประวัติความเป็นมา
            <div style={{ borderBottom: '4px solid white', width: '80px', margin: '10px 0' }}></div>
            <div className='subHistory'>
              {aboutData.history }
            </div>
          </div>
          <div className='historyUnderline'></div>
        </Col>
      </Row>

      <Row>
        <Col sm={24} lg={4}></Col>
        <Col lg={16} style={{ alignItems: 'center', textAlign: 'center' }}>
          <div className='abusPlay'>
            <video width="100%" height="100%" controls>
              <source src={aboutData.video} type="video/mp4" />
            </video>
          </div>
          <div className='vdoName'>
            {aboutData.videoName }
          </div>
          <div className='vdoDesc'>
            {aboutData.videoDescription }
          </div>
        </Col>
        <Col lg={4}></Col>
      </Row>

      <Row style={{ margin: '50px 0' }}>
        <Col sm={24} lg={16}>
          <div className='bigObjective'>
            วัตถุประสงค์
            <div style={{ borderBottom: '4px solid #1BB39B', width: '80px', margin: '10px 0' }}></div>
          </div>
          <div className='objective'>
            {aboutData.objective }
          </div>
          <div className='objective'>
            {aboutData.objective }
          </div>
          <div className='goalUnderline'></div>
        </Col>
        <Col sm={24} lg={8}>
          <div className='pictureAbus'>
            <img src={aboutData.objectiveImageURL} className='insideObjImg'  />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default AbusPage;
