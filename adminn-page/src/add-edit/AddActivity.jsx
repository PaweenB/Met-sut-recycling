import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/NavigationMenu';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { db, storage } from '../firebase';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Col, Row } from 'antd';
import './AddActivity.css';

const AddActivity = () => {
  const [activityName, setActivityName] = useState('');
  const [activityDate, setActivityDate] = useState(new Date());
  const [imageURL, setImageURL] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [activityDescription, setActivityDescription] = useState('');
  const [order, setOrder] = useState(0); // State for storing the order
  const navigate = useNavigate();
  const storage = getStorage();

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'activities'));
        setOrder(querySnapshot.docs.length); // Set the order to the current length of the collection
      } catch (error) {
        console.error('Error fetching documents: ', error);
      }
    };

    fetchActivities();
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const activityData = {
        name: activityName,
        date: activityDate.toISOString(),
        imageURL: imageURL,
        description: activityDescription,
        order: order
      };
      await addDoc(collection(db, 'activities'), activityData);
      navigate('/activities');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const imageRef = ref(storage, `images/${file.name}`);
    try {
      await uploadBytes(imageRef, file);
      const url = await getDownloadURL(imageRef);
      setImageURL(url);
      setImageFile(file);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div className='actContainer'>
      <Sidebar />
      <div className='missionContent'>
        <h2 className="mainHead">เพิ่มข้อมูลกิจกรรม</h2>
        <div className="mainUnderLine"></div>
        <Row>
          <Col lg={8} onClick={() => document.getElementById('uploadInput').click()}>
            <p style={{ color: '#7F8698', fontSize: '20px' }}>รูปภาพ</p>
            <input type="file" accept="image/*" id="uploadInput" style={{ display: "none" }} onChange={handleImageUpload} />
            <div className="imageContainer" style={{ cursor: "pointer" }}>
              {imageFile && <img src={URL.createObjectURL(imageFile)} alt="Uploaded" className="uploadedImage" />}
            </div>
          </Col>
          <Col lg={16}>
            <form className="activityForm" onSubmit={handleFormSubmit}>
              <div className="formGroup">
                <label htmlFor="activityName">ชื่อกิจกรรม:</label>
                <input
                  type="text"
                  id="activityName"
                  value={activityName}
                  onChange={(e) => setActivityName(e.target.value)}
                  required
                />
              </div>
              <div className="formGroup">
                <label htmlFor="activityDate">วันที่</label>
                <DatePicker
                  id="activityDate"
                  selected={activityDate}
                  onChange={(date) => setActivityDate(date)}
                  dateFormat="dd/MM/yyyy"
                  required
                  className="datePicker"
                />
                <label htmlFor="activityDescription" style={{ marginTop: '20px' }}>คำอธิบายกิจกรรม</label>
                <textarea
                  id="activityDescription"
                  style={{ backgroundColor: 'white', color: 'black', resize: 'none', width: '626px', height: '339px' }}
                  value={activityDescription}
                  onChange={(e) => setActivityDescription(e.target.value)}
                  required
                />
              </div>
              <div className="buttonGroup">
                <button type="submit" className="actSubmitButton">บันทึก</button>
                <button type="button" className="cancleButton" onClick={() => navigate('/activities')}>ยกเลิก</button>
              </div>
            </form>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default AddActivity;
