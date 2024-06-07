import React, { useState } from "react";
import Sidebar from "../components/NavigationMenu";
import { useNavigate } from "react-router-dom";
import { collection, addDoc, getDocs } from "firebase/firestore"; 
import { db } from "../firebase";
import './AddMission.css';

const AddMissions = () => {
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const missionsSnapshot = await getDocs(collection(db, "missions"));
      const newOrder = missionsSnapshot.docs.length;

      await addDoc(collection(db, "missions"), {
        title,
        order: newOrder,
      });
      navigate("/missions");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const handleCancel = () => {
    navigate("/missions");
  };

  return (
    <div className="addMissionContainer">
      <Sidebar />
      <div className="addMissionContent">
        <p className="addMissionHead">เพิ่มข้อมูลภารกิจ</p>
        <div className="missionUnderLine"></div>
        <div className="addMissionForm">
          <label className="formHead">ชื่อหัวข้อ</label>
          <input 
            className="addMissionInput" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
          />
          <div className="addMissionButton">
            <button className='submitButton' onClick={handleSubmit}>สร้าง</button>
            <button className='cancelButton' onClick={handleCancel}>ยกเลิก</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMissions;
