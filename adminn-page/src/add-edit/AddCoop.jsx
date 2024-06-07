import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db } from '../firebase';
import Sidebar from '../components/NavigationMenu';
import './AddCoop.css'
import { Col, Row } from 'antd';

function AddCoop() {
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [order, setOrder] = useState(0); // State for storing the order
  const navigate = useNavigate();
  const storage = getStorage(); 

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(null);
    }
  };

  useEffect(() => {
    const fetchCoops = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "coops"));
        const newData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setOrder(newData.length); // Set the order to the current length of the collection
      } catch (e) {
        console.error("Error fetching documents: ", e);
      }
    };

    fetchCoops();
  }, []);

  const addCoop = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = '';
      if (image) {
        const imageRef = ref(storage, `images/${image.name}`);
        await uploadBytes(imageRef, image);
        imageUrl = await getDownloadURL(imageRef);
      }
      await addDoc(collection(db, 'coops'), { name, imageUrl, order });
      setName('');
      setImage(null);
      setImagePreview(null);
      navigate('/coop'); 
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  const handleCancel = () => {
    navigate('/coop'); 
  };

  return (
    <div className="addCoopContainer">
      <Sidebar />
      <div className="addCoopContent">
        <p className="addCoopHead">เพิ่มข้อมูลความร่วมมือด้านวิชาการ</p>
        <div className="missionUnderLine"></div>
        <div className="addCoopForm">
          <form onSubmit={addCoop}>
            <Row>
              <Col lg={8} onClick={() => document.getElementById('imageInput').click()}>
                <p style={{fontSize:'20px'}}>โลโก้</p>
                <div className="imagePreviewContainer">
                  <input id="imageInput" type="file" style={{ display: 'none' }} onChange={handleImageChange} />
                  {imagePreview && <img src={imagePreview} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                </div>
              </Col>
              <Col lg={16}>
                <p style={{fontSize:'20px', marginLeft:'90px'}}>ชื่อหน่วยงาน</p>
                <input type="text" style={{backgroundColor:'white', color:'black', marginLeft:'90px',width:'626px',height:'45px'}} value={name} onChange={(e) => setName(e.target.value)} required />
              </Col>
            </Row>
            <div className="cButtonContainer">
              <button type="submit" style={{backgroundColor:'#1BB39B'}}>สร้าง</button>
              <button type="button" onClick={handleCancel} style={{backgroundColor:'white', borderColor:'#1BB39B', color:'#1BB39B'}}>ยกเลิก</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddCoop;
