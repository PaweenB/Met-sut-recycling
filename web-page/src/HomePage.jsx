import React, { useState, useEffect } from 'react';
import { Row, Col, Button } from 'antd';
import { PictureOutlined, PlayCircleOutlined, CalendarOutlined } from '@ant-design/icons';
import './HomePage.css';
import './App.css';
import { collection, getDocs } from "firebase/firestore";
import { db } from './firebase';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const HomePage = () => {

  const [hCoops, setHCoops] = useState([]);
  const [staffs, setStaffs] = useState([]);

  const fetchHCoops = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "hcoops"));
      const newData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setHCoops(newData);
      console.log(newData);
    } catch (e) {
      console.error("Error fetching documents: ", e);
    }
  };

  useEffect(() => {
    fetchHCoops();
  }, []);

  const fetchStaffs = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "staffs"));
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      }));
      setStaffs(newData);
      console.log(newData);
    } catch (e) {
      console.error("Error fetching documents: ", e);
    }
  }

  useEffect(() => {
    fetchStaffs();
  }, []);

  return (
    <div className='HomeContent'>
      <Row>
        <Col span={24}>
          <div>
            <img className='firstImage' src="./images/image51.png" alt="Innovative Processing and Recycling of Metals Research Center" />
            <div className="imageOverlay">
              <p className="overlayText1">Innovative Processing and Recycling <br /> of Metals Research Center (PRMRC)</p>
              <p className='overlayText2'>Suranaree University of Technology</p>
              <Button type="primary" className='overlayButton'>{'ดูเพิ่มเติม >'}</Button>
            </div>
          </div>
        </Col>
      </Row>
      <div>
        <p className='orgHeadWord'> องค์กรที่เกี่ยวข้อง หรือผู้สนับสนุนโครงการ
          <div className='headUnderLine'></div>
        </p>

        <div className='pcRow'>
          <Row style={{ textAlign: 'center', width: '100%' }}>
            {hCoops.map((coop, index) => (
              <Col span={8} key={index}>
                <div className="container">
                  <div className="iconContainer">
                    {coop.imageUrl ? <img src={coop.imageUrl} className="hCoopImage" alt={coop.name} /> : <PictureOutlined />}
                  </div>
                  <div className='organized'>
                    <div className="coopData">
                      <p>{coop.name}</p>
                      <p style={{ color: 'black' }}>{coop.desc}</p>
                    </div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </div>

        <div className="carousel-container">
          <Slider dots={true} infinite={hCoops.length > 1} speed={500} slidesToShow={1} slidesToScroll={1}>
            {hCoops.map((coop, index) => (
              <div key={index}>
                <Row className='coopRow1'>
                  <Col span={24}>
                    <div className="container">
                      <div className="iconContainer3">
                        {coop.imageUrl ? <img src={coop.imageUrl} className="hCoopImage" alt={coop.name} /> : <PictureOutlined />}
                      </div>
                      <div className='organized'>
                        <div className="coopData">
                          <p>{coop.name}</p>
                          <p style={{ color: 'black' }}>{coop.desc}</p>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            ))}
          </Slider>
        </div>

        <Row style={{ margin: '90px 0' }}>
          <Col span={2}></Col>
          <Col span={20}>
            <div className="servicesImageContainer">
              <img className='serviceImg' src="./images/image21.png" alt="Service" />
              <div className="servicesOverlay">
                <p className='mission'>ภารกิจ</p>
                <div style={{ display: 'flex' }}>
                  <p className='service'>
                    บริการวิชาการต่าง ๆ ให้กับภาคอุตสาหกรรม</p>
                  <Button type="primary" className='serviceButton'>{'ดูเพิ่มเติม >'}</Button>
                </div>
              </div>
            </div>
          </Col>
          <div className='containerUnderline'></div>
          <Col span={2}></Col>
        </Row>

        <div style={{ margin: '-150px 0 0 0' }}>
          <p className='staffHeadword'>
            เจ้าหน้าที่ และ บุคลากร
            <div className='headUnderLine'></div>
          </p>
        </div>
        <div className='pcRow'>
          <Row>
            {staffs.map((staff, index) => (
              <Col span={8} key={index}>
                <div className="container">
                  <div className="iconContainer4">
                    {staff.imageUrl ? <img src={staff.imageUrl} className='hStaffImg' alt={staff.name} /> : <PictureOutlined />}
                  </div>
                  <div className='staffName'>
                    <div className="staffData">
                      <p>{staff.name}</p>
                    </div>
                  </div>
                  <div className='hStaffDesc' style={{fontWeight:'bold'}}>
                    <p>{staff.desc}</p>
                  </div>
                  <div className='staffRole'>
                    <p>{staff.subDesc}</p>
                  </div>
                  <div>
                  <Button type="primary" className='hStaffButton'>{'ดูเพิ่มเติม >'}</Button>
                  </div>
                
                </div>
              </Col>
            ))}
          </Row>
        </div>

        <div className="carousel-container3">
          <Slider dots={true} infinite={staffs.length > 1} speed={500} slidesToShow={1} slidesToScroll={1}>
            {staffs.map((staff, index) => (
              <div key={index}>
                <Row className="staffRow">
                  <Col span={24} className="staffCol">
                    <div className="container">
                      <div className="iconContainer4">
                        {staff.imageUrl ? <img src={staff.imageUrl} className="hStaffImg" alt={staff.name} /> : <PictureOutlined />}
                      </div>
                      <div className="staffName">
                        <div className="staffData">
                          <p>{staff.name}</p>
                        </div>
                      </div>
                      <div className="staffDesc">
                        <p>{staff.desc}</p>
                      </div>
                      <div className="staffRole">
                        <p>{staff.subDesc}</p>
                      </div>
                    </div>
                    <Button type="primary" className="hStaffButton">ดูเพิ่มเติม &gt;</Button>
                  </Col>
                </Row>
              </div>
            ))}
          </Slider>
        </div>

        <Row className='History' style={{ width: '80%' }}>
          <Col sm={24} lg={12}>
            <div className='playCircle'>
              <PlayCircleOutlined />
            </div>
          </Col>
          <Col sm={24} lg={12}>
            <p className='abUsHeadWord'>
              ประวัติความเป็นมา
              <div className='headUnderLine'></div>
            </p>

            <div className='abUsContent'>
              ประวัติความเป็นมาประวัติความเป็นมาประวัติความเป็นมาประวัติความเป็นมาประวัติความเป็นมาประวัติความเป็นมาประวัติความเป็นมา
              ประวัติความเป็นมาประวัติความเป็นมาประวัติความเป็นมาประวัติความเป็นมาประวัติความเป็นมาประวัติความเป็นมาประวัติความเป็นมา
              ประวัติความเป็นมาประวัติความเป็นมาประวัติความเป็นมาประวัติความเป็นมาประวัติความเป็นมาประวัติความเป็นมาประวัติความเป็นมา
              ประวัติความเป็นมาประวัติความเป็นมาประวัติความเป็นมาประวัติความเป็นมาประวัติความเป็นมาประวัติความเป็นมาประวัติความเป็นมา
              ประวัติความเป็นมาประวัติความเป็นมาประวัติความเป็นมาประวัติความเป็นมาประวัติความเป็นมาประวัติความเป็นมาประวัติความเป็นมาประวัติความเป็นมา
            </div>
            <div className='abUsContent'>
              ประวัติความเป็นมาประวัติความเป็นมาประวัติความเป็นมาประวัติความเป็นมาประวัติความเป็นมาประวัติความเป็นมาประวัติความเป็นมา
              ประวัติความเป็นมาประวัติความเป็นมาประวัติความเป็นมาประวัติความเป็นมาประวัติความเป็นมาประวัติความเป็นมาประวัติความเป็นมา
              ประวัติความเป็นมาประวัติความเป็นมาประวัติความเป็นมาประวัติความเป็นมาประวัติความเป็นมาประวัติความเป็นมาประวัติความเป็นมา
              ประวัติความเป็นมาประวัติความเป็นมาประวัติความเป็นมาประวัติความเป็นมาประวัติความเป็นมาประวัติความเป็นมาประวัติความเป็นมา
            </div>

            <Button type="primary" className='abUsButton'>{'ดูเพิ่มเติม >'}</Button>
          </Col>
          <div className='containerUnderline2'></div>
        </Row>

        <Row style={{ width: '100%' }}>
          <Col sm={24} lg={8} className='homeAct'>
            <p className='actHead'>
              | กิจกรรม
            </p>
            <div>
              <div className='homeDate'>
                <div className='date'>
                  10<br />
                  <span style={{ fontSize: '14px' }}>ส.ค. 2567</span>
                </div>
                <div className='picName'>ชื่อเกี่ยวกับรูปภาพชื่อเกี่ยวกับ<br />
                  ชื่อกิจกรรม ชื่อกิจกรรม ชื่อกิจกรรม ชื่อกิจกรรม
                  <Button type="primary" className='hActButton'>{'ดูเพิ่มเติม >'}</Button>
                </div>
              </div>
              <div className='homeDate'>
                <div className='date'>
                  27<br />
                  <span style={{ fontSize: '14px' }}>ส.ค. 2567</span>
                </div>
                <div className='picName'>ชื่อเกี่ยวกับรูปภาพชื่อเกี่ยวกับ<br />
                  ชื่อกิจกรรม ชื่อกิจกรรม ชื่อกิจกรรม ชื่อกิจกรรม
                  <Button type="primary" className='hActButton'>{'ดูเพิ่มเติม >'}</Button>
                </div>
              </div>
              <div className='homeDate'>
                <div className='date'>
                  30<br />
                  <span style={{ fontSize: '14px' }}>ส.ค. 2567</span>
                </div>
                <div className='picName'>ชื่อเกี่ยวกับรูปภาพชื่อเกี่ยวกับ<br />
                  ชื่อกิจกรรม ชื่อกิจกรรม ชื่อกิจกรรม ชื่อกิจกรรม
                  <Button type="primary" className='hActButton'>{'ดูเพิ่มเติม >'}</Button>
                </div>
              </div>
            </div>
          </Col>

          <Col sm={24} lg={8} className='homeWork'>
            <p className='workHead'>
              | ผลงานทางวิชาการ
            </p>
            <div className='calendar'>
              <div style={{ color: '#1BB39B', fontSize: '14px' }}>
                <CalendarOutlined /> {'<วันที่ เวลา>'}
                <div className='workName'>
                  ชื่อผลงานทางวิชาการชื่อผลงานทางวิชาการชื่อผลงานทางวิชาการ
                </div>
              </div>
            </div>

            <div className='calendar'>
              <div style={{ color: '#1BB39B', fontSize: '14px' }}>
                <CalendarOutlined /> {'<วันที่ เวลา>'}
                <div className='workName'>
                  ชื่อผลงานทางวิชาการชื่อผลงานทางวิชาการชื่อผลงานทางวิชาการ
                </div>
              </div>
            </div>

            <div className='calendar'>
              <div style={{ color: '#1BB39B', fontSize: '14px' }}>
                <CalendarOutlined /> {'<วันที่ เวลา>'}
                <div className='workName'>
                  ชื่อผลงานทางวิชาการชื่อผลงานทางวิชาการชื่อผลงานทางวิชาการ
                </div>
              </div>
            </div>
          </Col>

          <Col sm={24} lg={8} className='homeGall'>
            <p className='homeGallHead'>
              | แกลอรี่
            </p>
            <div className='gallImg'>
              <PictureOutlined className='picIcon' />
              <div className='gallName'>ชื่อเกี่ยวกับรูปภาพชื่อเกี่ยวกับ<br />
                รูปภาพชื่อเกี่ยวกับรูปภาพ <br />
                <span className='gallCalendar'><CalendarOutlined /> {'<วันที่ เวลา>'}</span> </div>
            </div>
            <div className='gallImg'>
              <PictureOutlined className='picIcon' />
              <div className='gallName'>ชื่อเกี่ยวกับรูปภาพชื่อเกี่ยวกับ<br />
                รูปภาพชื่อเกี่ยวกับรูปภาพ <br />
                <span className='gallCalendar'><CalendarOutlined /> {'<วันที่ เวลา>'}</span> </div>
            </div>
            <div className='gallImg'>
              <PictureOutlined className='picIcon' />
              <div className='gallName'>ชื่อเกี่ยวกับรูปภาพชื่อเกี่ยวกับ<br />
                รูปภาพชื่อเกี่ยวกับรูปภาพ <br />
                <span className='gallCalendar'><CalendarOutlined /> {'<วันที่ เวลา>'}</span> </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default HomePage;
