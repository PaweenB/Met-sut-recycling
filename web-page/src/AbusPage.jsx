import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import { PictureOutlined, PlayCircleOutlined } from '@ant-design/icons';
import './AbusPage.css';

const AbusPage = () => {

  return (
    <div style={{ margin: '100px 0', width: '100vw', display: 'flex', flexDirection: 'column' }}>
      <div className='abusFirst'>
        เกี่ยวกับเรา
        <div style={{ borderBottom: '4px solid #1BB39B', width: '80px', margin:'10px 0'}}></div>
      </div>
      <div style={{ display: 'flex' }}>
        <img src="./images/image11.png" alt="First Image"
          className='abusIcon'
           />
        <div className='mainWord' >
          Innovative Processing and Recycling of Metals Research Center (PRMRC)
          <br />
          <span className='subWord'>
            ศูนย์วิจัยนวัตกรรมการผลิตและรีไซเคิลโลหะ
          </span>
          <div style={{ borderBottom: '2px solid #1BB39B', width: '1000px', margin: '40px 0' }}></div>
        </div>
      </div>
      <Row>
        <Col sm={24} lg={10}>
          <div
            className='historyImg'
          >
            <PictureOutlined />
          </div>
        </Col>
        <Col sm={24} lg={14} className='borderHistory' >
          <div className='mainHistory'>
            ประวัติความเป็นมา
            <div  style={{ borderBottom: '4px solid white', width: '80px', margin: '10px 0' }}></div>
            <div className='subHistory' >
              ประวัติความเป็นมาประวัติความเป็นมาประวัติความเป็นมา
              ประวัติความเป็นมาประวัติความเป็นมาประวัติความเป็นมา
              ประวัติความเป็นมาประวัติความเป็นมาประวัติความเป็นมา
              ประวัติความเป็นมาประวัติความเป็นมาประวัติความเป็นมา
              ประวัติความเป็นมาประวัติความเป็นมาประวัติความเป็นมา
              ประวัติความเป็นมาประวัติความเป็นมาประวัติความเป็นมา
              ประวัติความเป็นมาประวัติความเป็นมาประวัติความเป็นมา
            </div>
            <div className='subHistory' >
              ประวัติความเป็นมาประวัติความเป็นมาประวัติความเป็นมา
              ประวัติความเป็นมาประวัติความเป็นมาประวัติความเป็นมา
              ประวัติความเป็นมาประวัติความเป็นมาประวัติความเป็นมา
              ประวัติความเป็นมาประวัติความเป็นมาประวัติความเป็นมา
              ประวัติความเป็นมาประวัติความเป็นมาประวัติความเป็นมา
              ประวัติความเป็นมาประวัติความเป็นมาประวัติความเป็นมา
              ประวัติความเป็นมาประวัติความเป็นมาประวัติความเป็นมา
            </div>
          </div>
          <div className='historyUnderline'></div>
        </Col>
      </Row>

      <Row>
        <Col sm={24} lg={4}></Col>
        <Col lg={16} style={{alignItems:'center', textAlign:'center',}}>
          <div
            className='abusPlay'    
          >
            <PlayCircleOutlined />
          </div>
          <div className='vdoName'>
            ชื่อวีดีโอ ชื่อวีดีโอ ชื่อวีดีโอ ชื่อวีดีโอ ชื่อวีดีโอ ชื่อวีดีโอ ชื่อวีดีโอ  
           </div>
           <div className='vdoDesc'>
            คำอธิบายคำอธิบายคำอธิบายคำอธิบายคำอธิบายคำอธิบายคำอธิบายคำอธิบายคำอธิบายคำอธิบาย
            คำอธิบายคำอธิบายคำอธิบายคำอธิบายคำอธิบายคำอธิบายคำอธิบาย
           </div>
          </Col>
          <Col lg={4}></Col>
      </Row> 
      
      <Row style={{margin:'50px 0'}}>
        <Col sm={24} lg={16}>
          <div className='bigObjective'>
            วัตถุประสงค์
            <div style={{ borderBottom: '4px solid #1BB39B', width: '80px', margin:'10px 0'}}></div>
          </div>
          <div className='objective'>
            วัตถุประสงค์วัตถุประสงค์วัตถุประสงค์วัตถุประสงค์วัตถุประสงค์วัตถุประสงค์วัตถุประสงค์วัตถุประสงค์วัตถุประสงค์วัตถุประสงค์<br/>วัตถุประสงค์วัตถุประสงค์วัตถุประสงค์
            วัตถุประสงค์วัตถุประสงค์วัตถุประสงค์วัตถุประสงค์วัตถุประสงค์วัตถุประสงค์วัตถุประสงค์<br/>วัตถุประสงค์วัตถุประสงค์วัตถุประสงค์วัตถุประสงค์วัตถุประสงค์วัตถุประสงค์
            วัตถุประสงค์วัตถุประสงค์วัตถุประสงค์วัตถุประสงค์<br/>วัตถุประสงค์วัตถุประสงค์วัตถุประสงค์วัตถุประสงค์วัตถุประสงค์วัตถุประสงค์วัตถุประสงค์วัตถุประสงค์วัตถุประสงค์
            วัตถุประสงค์<br/>วัตถุประสงค์วัตถุประสงค์วัตถุประสงค์วัตถุประสงค์วัตถุประสงค์วัตถุประสงค์วัตถุประสงค์วัตถุประสงค์วัตถุประสงค์วัตถุประสงค์<br/>วัตถุประสงค์วัตถุประสงค์
            วัตถุประสงค์วัตถุประสงค์วัตถุประสงค์วัตถุประสงค์วัตถุประสงค์วัตถุประสงค์วัตถุประสงค์วัตถุประสงค์<br/>วัตถุประสงค์วัตถุประสงค์วัตถุประสงค์วัตถุประสงค์วัตถุประสงค์
            วัตถุประสงค์วัตถุประสงค์วัตถุประสงค์วัตถุประสงค์วัตถุประสงค์<br/>วัตถุประสงค์วัตถุประสงค์
          </div>
          <div className='objective'>
            วัตถุประสงค์วัตถุประสงค์วัตถุประสงค์วัตถุประสงค์วัตถุประสงค์วัตถุประสงค์วัตถุประสงค์วัตถุประสงค์วัตถุประสงค์วัตถุประสงค์<br/>วัตถุประสงค์วัตถุประสงค์วัตถุประสงค์วัตถุประสงค์
            วัตถุประสงค์วัตถุประสงค์วัตถุประสงค์วัตถุประสงค์วัตถุประสงค์วัตถุประสงค์<br/>วัตถุประสงค์วัตถุประสงค์วัตถุประสงค์วัตถุประสงค์วัตถุประสงค์วัตถุประสงค์วัตถุประสงค์
          </div>
          <div className='goalUnderline' ></div>
          
        </Col>  
        <Col sm={24} lg={8}>
        <div
          className='pictureAbus'
          >
            <PictureOutlined />
          </div>
        </Col>
      </Row>
      
    </div>
  );
};

export default AbusPage;
