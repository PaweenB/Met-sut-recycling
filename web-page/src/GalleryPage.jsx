import React from 'react';
import { Row, Col, Button } from 'antd';
import { PictureOutlined, CalendarOutlined } from '@ant-design/icons';
import './GalleryPage.css';

const GalleryPage = () => {
  return (
    <div style={{ margin: '50px 0', }}>
      <Row>
        <Col span={24}>
          <div >
            <img className='galleryBanner' src="./images/image51.png"/>
            <div className="gImageOverlay">
              <p className="goverlayText1" >ชื่อเกี่ยวกับรูปภาพชื่อเกี่ยวกับรูปภาพชื่อเกี่ยวกับรูปภาพ</p>
              <p className='goverlayText2' >{'<วันที่ เวลา>'}</p>
            </div>
          </div>
        </Col>
      </Row>

      <div>
            <p className='HeadWord' style={{ margin: '90px 0 0 30px' }}>
              ภาพกิจกรรมและแกลอรี่
              <div style={{ borderBottom: '4px solid #1BB39B', width: '80px', margin: '10px 0' }}></div>
            </p>
            <Row>
              <Col sm={24} lg={12}>
                
              </Col>
            </Row>
            <div  style={{ margin: '50px 10px 0 80px', display: 'flex' }}>
              <PictureOutlined className='galleryImg' 
              />
              <div className='imgName'>ชื่อเกี่ยวกับรูปภาพชื่อเกี่ยวกับ<br />
                รูปภาพชื่อเกี่ยวกับรูปภาพ <br />
                <span
                  style={{
                    fontSize: '14px',
                    color: '#1BB39B',
                  }}
                >
                  <CalendarOutlined /> {'<วันที่ เวลา>'}
                </span>
              </div>
              <Button className='imgButton'>{'ดูเพิ่มเติม >'}</Button>
            </div>        
            <div style={{ margin: '50px 10px 0 80px', display: 'flex' }}>
              <PictureOutlined className='galleryImg'
              />
              <div className='imgName'>ชื่อเกี่ยวกับรูปภาพชื่อเกี่ยวกับ<br />
                รูปภาพชื่อเกี่ยวกับรูปภาพ <br />
                <span
                  style={{
                    fontSize: '14px',
                    color: '#1BB39B',
                  }}
                >
                  <CalendarOutlined /> {'<วันที่ เวลา>'}
                </span>
              </div>
              <Button className='imgButton'>{'ดูเพิ่มเติม >'}</Button>
            </div>        
            <div style={{ margin: '50px 10px 0 80px', display: 'flex' }}>
              <PictureOutlined className='galleryImg'
              />
              <div  className='imgName'>ชื่อเกี่ยวกับรูปภาพชื่อเกี่ยวกับ<br />
                รูปภาพชื่อเกี่ยวกับรูปภาพ <br />
                <span
                  style={{
                    fontSize: '14px',
                    color: '#1BB39B',
                  }}
                >
                  <CalendarOutlined /> {'<วันที่ เวลา>'}
                </span>
              </div>
              <Button className='imgButton'>{'ดูเพิ่มเติม >'}</Button>
            </div>        
            <div style={{ margin: '50px 10px 0 80px', display: 'flex' }}>
              <PictureOutlined className='galleryImg'
              />
              <div  className='imgName'>ชื่อเกี่ยวกับรูปภาพชื่อเกี่ยวกับ<br />
                รูปภาพชื่อเกี่ยวกับรูปภาพ <br />
                <span
                  style={{
                    fontSize: '14px',
                    color: '#1BB39B',
                  }}
                >
                  <CalendarOutlined /> {'<วันที่ เวลา>'}
                </span>
              </div>
              <Button className='imgButton'>{'ดูเพิ่มเติม >'}</Button>
            </div>        
          </div>
    </div>
  );
};

export default GalleryPage;
