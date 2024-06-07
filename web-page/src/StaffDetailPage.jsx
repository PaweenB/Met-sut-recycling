import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from "firebase/firestore";
import { db } from './firebase';
import './StaffDetailPage.css'
import { Col, Row } from 'antd';

const StaffDetailPage = () => {
  const { id } = useParams();
  const [staff, setStaff] = useState(null);
  const [error, setError] = useState(null);

  const fetchStaffDetail = async () => {
    try {
      const docRef = doc(db, "staffs", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setStaff(docSnap.data());
      } else {
        setError("No such document!");
      }
    } catch (e) {
      console.error("Error fetching document: ", e);
      setError("Error fetching document");
    }
  };

  useEffect(() => {
    fetchStaffDetail();
  }, [id]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!staff) {
    return <div>Loading...</div>;
  }

  console.log("Staff data:", staff);

  return (
    <div className="staffDetail">
      <div style={{ fontSize: '32px', color: '#1BB39B', fontWeight: 'bold', margin: '40px 0 0 30px' }}>
        เจ้าหน้าที่ และบุคลากร
        <div style={{ borderBottom: '4px solid #1BB39B', width: '80px', margin: '10px 0' }}></div>
      </div>

      <Row>
        <Col lg={8}>
            <img src={staff.imageUrl}  className="staffDetailImg" />
        </Col>
        <Col lg={16}>
            <p className='staffDetailName'>{`${staff.prefix} ${staff.firstName} ${staff.lastName}`}</p>
            <p className='staffDetailDesc'>{staff.desc}</p> 
            <p>{staff.subDesc}</p> 
            <div style={{ borderBottom: '1px solid #1BB39B', width: '532px', margin: '10px 0' }}></div>
        </Col>
      </Row>

     
    </div>
  );
};

export default StaffDetailPage;
