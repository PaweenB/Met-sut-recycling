import React, { useState, useEffect } from 'react';
import { Row, Col, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs } from "firebase/firestore";
import { db } from './firebase';
import './StaffPage.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { PictureOutlined } from '@ant-design/icons';

const StaffPage = () => {
  const [staffs, setStaffs] = useState([]);
  const navigate = useNavigate();

  const settings = {
    dots: true,
    infinite: staffs.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  const fetchStaffs = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "staffs"));
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      }));
      const sortedData = newData.sort((a, b) => a.order - b.order); // Sort by order field
      setStaffs(sortedData);
      console.log(sortedData);
    } catch (e) {
      console.error("Error fetching documents: ", e);
    }
  }

  useEffect(() => {
    fetchStaffs();
  }, []);

  const handleMoreClick = (id) => {
    navigate(`/staff/${id}`);
  };

  return (
    <div className='staffHeader'>
      <div style={{ fontSize: '32px', color: '#1BB39B', fontWeight: 'bold', margin: '40px 0 0 30px' }}>
        เจ้าหน้าที่ และบุคลากร
        <div style={{ borderBottom: '4px solid #1BB39B', width: '80px', margin: '10px 0' }}></div>
      </div>

      <div className='pcRow'>
        <Row className='staffRow'>
          {staffs.map((staff) => (
            <Col span={8} key={staff.id}>
              <div className="container">
                <div className="iconContainer4">
                  {staff.imageUrl ? <img src={staff.imageUrl} className='staffImg' alt={staff.name} /> : <PictureOutlined />}
                </div>
                <div className='staffName'>
                  <div className="staffData">
                    <p>{`${staff.prefix} ${staff.firstName} ${staff.lastName}`}</p>
                  </div>
                </div>
                <div className='staffDesc'>
                  <p>{staff.desc}</p>
                </div>
                <div className='staffRole'>
                  <p>{staff.subDesc}</p>
                </div>
                <Button className='staffButton' style={{ backgroundColor: '#1BB39B', color: 'white' }} onClick={() => handleMoreClick(staff.id)}>ดูเพิ่มเติม</Button>
              </div>
            </Col>
          ))}
        </Row>
      </div>

      <div className="carousel-container3">
        <Slider {...settings}>
          {staffs.map((staff) => (
            <div key={staff.id}>
              <Row className='staffRow'>
                <Col span={24}>
                  <div className="container">
                    <div className="iconContainer4">
                      {staff.imageUrl ? <img src={staff.imageUrl} className='staffImg' alt={staff.name} /> : <PictureOutlined />}
                    </div>
                    <div className='staffName'>
                      <div className="staffData">
                        <p>{`${staff.prefix} ${staff.firstName} ${staff.lastName}`}</p>
                      </div>
                    </div>
                    <div className='staffDesc'>
                      <p>{staff.desc}</p>
                    </div>
                    <div className='staffRole'>
                      <p>{staff.subDesc}</p>
                    </div>
                    <Button type="primary" className='staffButton' onClick={() => handleMoreClick(staff.id)}>{'ดูเพิ่มเติม >'}</Button>
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

export default StaffPage;
