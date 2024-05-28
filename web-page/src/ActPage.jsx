import React from 'react';
import { Row, Col, Button} from 'antd';

import { PictureOutlined, CalendarOutlined } from '@ant-design/icons';
import './ActPage.css';


const ActPage = () => {
  return (
    <div style={{margin:'200px 0' , width:'100vw'}}>
        <div className='actFirst' >
              กิจกรรมทางวิชาการ
            <div style={{ borderBottom: '4px solid #1BB39B', width: '80px', margin:'10px 0'}}></div>
        </div>
        <Row>
            <Col sm={24} lg={12}>
            <div 
              className='actPicture'
             >
              <PictureOutlined/>
            </div>
            </Col>
            <Col sm={24} lg={12}>
            <div className='activity'>
                <div 
                  className='dateMonth'
                >
                  10<br/>
                  <span style={{fontSize:'14px'}}>ส.ค. 2567</span>
              </div>
              <div className='actName'>ชื่อกิจกรรม ชื่อกิจกรรม ชื่อกิจกรรม ชื่อกิจกรรม  
                <br/> <span
                  className='dateTime'
                >
                  <CalendarOutlined /> {'<วันที่ เวลา>'}
                </span>
                <br/>
                <Button type="primary" 
                  className='actButton'
                  >
                      {'ดูเพิ่มเติม >'}
                </Button>
              </div>  
              </div>     
              <div className='activity'>
                <div 
                  className='dateMonth'
                >
                  10<br/>
                  <span style={{fontSize:'14px'}}>ส.ค. 2567</span>
              </div>
              <div className='actName'>ชื่อกิจกรรม ชื่อกิจกรรม ชื่อกิจกรรม ชื่อกิจกรรม  
                <br/> <span
                  className='dateTime'
                >
                  <CalendarOutlined /> {'<วันที่ เวลา>'}
                </span>
                <br/>
                <Button type="primary" 
                  className='actButton'>
                      {'ดูเพิ่มเติม >'}
                </Button>
              </div>  
              </div>     
              <div className='activity'>
                <div 
                  className='dateMonth'
                >
                  10<br/>
                  <span style={{fontSize:'14px'}}>ส.ค. 2567</span>
              </div>
              <div className='actName'>ชื่อกิจกรรม ชื่อกิจกรรม ชื่อกิจกรรม ชื่อกิจกรรม  
                <br/> <span
                  className='dateTime'
                >
                  <CalendarOutlined /> {'<วันที่ เวลา>'}
                </span>
                <br/>
                <Button type="primary" 
                  className='actButton'>
                      {'ดูเพิ่มเติม >'}
                </Button>
              </div>  
              </div>     
              <div className='activity'>
                <div 
                  className='dateMonth'
                >
                  10<br/>
                  <span style={{fontSize:'14px'}}>ส.ค. 2567</span>
              </div>
              <div className='actName'>ชื่อกิจกรรม ชื่อกิจกรรม ชื่อกิจกรรม ชื่อกิจกรรม  
                <br/> <span
                  className='dateTime'
                >
                  <CalendarOutlined /> {'<วันที่ เวลา>'}
                </span>
                <br/>
                <Button type="primary" 
                  className='actButton'>
                      {'ดูเพิ่มเติม >'}
                </Button>
              </div>  
              </div>     
              
            </Col>
        </Row>
    </div>
  );
};

export default ActPage;