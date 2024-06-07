import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { DeleteOutlined, EditOutlined, ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import Sidebar from "../components/NavigationMenu";
import './styles/mission.css'; 
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

const Missions = () => {
  const [missions, setMissions] = useState([]);
  const [showModal, setShowModal] = useState(false); 
  const [selectedMissionId, setSelectedMissionId] = useState(null); 
  const [selectedMissionTitle, setSelectedMissionTitle] = useState(""); 
  const navigate = useNavigate();

  const AddMission = () => {
    navigate('/missions/add');
  };

  useEffect(() => {
    const fetchMissions = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "missions"));
        const missionsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        missionsList.sort((a, b) => a.order - b.order);
        setMissions(missionsList);
      } catch (error) {
        console.error("Error fetching missions: ", error);
      }
    };
    fetchMissions();
  }, []);

  const handleDelete = async (id, title) => { 
    setSelectedMissionId(id); 
    setSelectedMissionTitle(title); 
    setShowModal(true); 
  };

  const confirmDelete = async () => {
    try {
      await deleteDoc(doc(db, "missions", selectedMissionId)); 
      setMissions(missions.filter(mission => mission.id !== selectedMissionId)); 
      setShowModal(false); 
      fetchMissions();  // Fetch the updated list of missions
    } catch (error) {
      console.error("Error deleting mission: ", error);
    }
  };

  const closeModal = () => {
    setShowModal(false); 
  };

  const moveMission = async (index, direction) => {
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex >= 0 && newIndex < missions.length) {
      try {
        const updatedMissions = [...missions];
        const temp = updatedMissions[newIndex];
        updatedMissions[newIndex] = updatedMissions[index];
        updatedMissions[index] = temp;
        setMissions(updatedMissions);
        
        for (let i = 0; i < updatedMissions.length; i++) {
          const missionRef = doc(db, "missions", updatedMissions[i].id);
          await updateDoc(missionRef, { order: i });
        }
      } catch (error) {
        console.error("Error updating document order: ", error);
      }
    }
  };

  const ConfirmModal = ({ isOpen, onCancel, onConfirm }) => {
    return (
      <Modal open={isOpen} onClose={onCancel}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4, textAlign: 'center' }}>
          <p style={{ color: 'red', fontSize: 24 }}>ดำเนินการลบข้อมูล</p>
          <div className="missionUnderLine"/>
          <p>คุณกำลังลบข้อมูล</p>
          <p>{selectedMissionTitle}</p>
          <div className="modal-buttons">
            <br/>
            <Button onClick={onConfirm} variant="contained" color="error">ตกลง</Button>
            <Button onClick={onCancel} variant="contained" sx={{marginLeft:'200px', background:'white', color:'#7F8698'}}>ยกเลิก</Button>
          </div>
        </Box>
      </Modal>
    );
  };

  return (
    <div className='missionContainer'>
      <Sidebar />
      <div className='missionContent'>
        <p className="mainHead">จัดการข้อมูลภารกิจ</p>
        <div className="missionUnderLine"></div>
        <button className='cAddButton' onClick={AddMission}>+ เพิ่ม</button>
        
        <div className="tableContainer">
          <table className="missionTable">
            <thead>
              <tr className="tableHeader">
                <th>ลำดับ</th>
                <th></th>
                <th></th>
                <th>ชื่อหัวข้อ</th>
                <th>จัดการ</th>
              </tr>
            </thead>
            <tbody style={{backgroundColor:'white', color:'#4F4F4F'}}>
              {missions.map((mission, index) => (
                <tr key={mission.id}>
                  <td>{index + 1}</td>
                  <td>
                    {index > 0 && (
                      <button onClick={() => moveMission(index, "up")} style={{ color: 'green', backgroundColor: 'white' }}><ArrowUpOutlined/></button>
                    )}
                  </td>
                  <td>
                    {index < missions.length - 1 && (
                      <button onClick={() => moveMission(index, "down")} style={{ color: 'orange', backgroundColor: 'white' }}><ArrowDownOutlined/></button>
                    )}
                  </td>
                  <td>{mission.title}</td>
                  <td>
                    <button onClick={() => navigate(`/missions/edit/${mission.id}`)} style={{ color: '#33363F', backgroundColor: 'white' }}><EditOutlined /></button>
                    <button onClick={() => handleDelete(mission.id, mission.title)} style={{ color: 'red', backgroundColor: 'white' }}><DeleteOutlined /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ConfirmModal 
        isOpen={showModal} 
        onCancel={closeModal} 
        onConfirm={confirmDelete} 
      />
    </div>
  );
};

export default Missions;
