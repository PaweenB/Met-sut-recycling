import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import { PictureOutlined } from '@ant-design/icons';
import { collection, getDocs } from "firebase/firestore";
import { db } from './firebase'; 
import './CoopPage.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const CoopPage = () => {
  const [coops, setCoops] = useState([]);
  
  const settings = {
    dots: true,
    infinite: coops.length > 1, 
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  const fetchCoops = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "coops"));
        const newData = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id
        }));
        setCoops(newData);
        console.log(newData);
    } catch (e) {
        console.error("Error fetching documents: ", e);
    }
  }

  useEffect(() => {
    fetchCoops();
  }, []);

  return (
    <div style={{ margin: '100px 0' }}>
      <div style={{ fontSize: '32px', color: '#1BB39B', fontWeight: 'bold', margin: '40px 0 0 30px' }}>
        ความร่วมมือด้านวิชาการ
        <div style={{ borderBottom: '4px solid #1BB39B', width: '80px', margin: '10px 0' }}></div>
      </div>
      <div className='pcRow'>
        <Row className='coopRow1'>
          {coops.map((coop, index) => (
            <Col span={8} key={index}>
              <div className="container">
                <div className="iconContainer3">
                  {coop.imageUrl && <img src={coop.imageUrl} className="coopImage" alt={coop.name} />}
                </div>
                <div className='coopName'>
                  <div className="coopData">
                    <p>{coop.name}</p>
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </div>

      <div className="carousel-container">
        <Slider {...settings}>
          {coops.map((coop, index) => (
            <div key={index}>
              <Row className='coopRow1'>
                <Col span={24}>
                  <div className="container">
                    <div className="iconContainer3">
                      {coop.imageUrl && <img src={coop.imageUrl} className="coopImage" alt={coop.name} />}
                    </div>
                    <div className='coopName'>
                      {coop.name}
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default CoopPage;