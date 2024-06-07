import React, { useState, useEffect } from "react";
import Sidebar from "../components/NavigationMenu";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import './AddMission.css';

const EditMission = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMission = async () => {
      try {
        const docRef = doc(db, "missions", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setTitle(docSnap.data().title);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document: ", error);
      }
    };
    fetchMission();
  }, [id]);

  const handleSubmit = async () => {
    try {
      const docRef = doc(db, "missions", id);
      await updateDoc(docRef, {
        title: title,
      });
      navigate("/missions");
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  const handleCancel = () => {
    navigate("/missions");
  };

  return (
    <div className="addMissionContainer">
      <Sidebar />
      <div className="addMissionContent">
        <p className="addMissionHead">แก้ไขข้อมูลภารกิจ</p>
        <div className="missionUnderLine"></div>
        <div className="addMissionForm">
          <label className="formHead">ชื่อหัวข้อ</label>
          <input 
            className="addMissionInput" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
          />
          <div className="addMissionButton">
            <button className='submitButton' onClick={handleSubmit}>บันทึก</button>
            <button className='cancelButton' onClick={handleCancel}>ยกเลิก</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditMission;
