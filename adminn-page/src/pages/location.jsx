import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import Sidebar from '../components/NavigationMenu';
import { db } from "../firebase";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import './styles/location.css';

const Location = () => {
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [englishAddress, setEnglishAddress] = useState("");
  const [thaiAddress, setThaiAddress] = useState("");
  const [locations, setLocations] = useState([]);

  const addLocation = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "locations"), { email, contactNumber, englishAddress, thaiAddress });
      console.log("Document written with ID:", docRef.id);

      await Promise.all(locations.map(async (location) => {
        await deleteDoc(doc(db, "locations", location.id));
        console.log("Document deleted:", location.id);
      }));

      fetchLocations();
      
      setEmail("");
      setContactNumber("")
      setEnglishAddress("")
      setThaiAddress("")
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const fetchLocations = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "locations"));
      const newData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setLocations(newData);
      console.log(newData);

      if (newData.length > 0) {
        const location = newData[0];
        setEmail(location.email);
        setContactNumber(location.contactNumber);
        setEnglishAddress(location.englishAddress);
        setThaiAddress(location.thaiAddress);
      }
    } catch (e) {
      console.error("Error fetching documents: ", e);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  return (
    <div className='locContainer'>
      <Sidebar />
      <div className='locContent'>
        <p className="mainHead">จัดการข้อมูลที่อยู่</p>
        <div className="mainUnderLine"></div>
        <form onSubmit={addLocation}>
          <label htmlFor="emailInput" className='locInputHead'>อีเมล</label>
          <input type="text" id="emailInput" value={email} onChange={(e) => setEmail(e.target.value)} className='locInput' />
          
          <label htmlFor="contactInput" className='locInputHead'>เบอร์ติดต่อ</label>
          <input type="text" id="contactInput" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} className='locInput' />
          
          <label htmlFor="englishAddressInput" className='locInputHead'>ที่อยู่ติดต่อภาษาอังกฤษ</label>
          <input type="text" id="englishAddressInput" value={englishAddress} onChange={(e) => setEnglishAddress(e.target.value)} className='bigLocInput' />
          
          <label htmlFor="thaiAddressInput" className='locInputHead'>ที่อยู่ติดต่อภาษาไทย</label>
          <input type="text" id="thaiAddressInput" value={thaiAddress} onChange={(e) => setThaiAddress(e.target.value)} className='bigLocInput' />
          
          <div className='abSubmitButtonContainer'>
            <Button type="primary" htmlType="submit" className='abSubmitButton'>บันทึก</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Location;
