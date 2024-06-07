import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Sidebar from '../components/NavigationMenu';
import { DeleteOutlined, EditOutlined, ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { db, storage } from '../firebase';
import './styles/act.css';
import { onSnapshot, collection, deleteDoc, doc, updateDoc, getDoc } from 'firebase/firestore';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

const Act = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [activities, setActivities] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteActivityId, setDeleteActivityId] = useState(null);
  const [deleteActivityName, setDeleteActivityName] = useState("");

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "activities"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      const sortedData = data.sort((a, b) => a.order - b.order);
      setActivities(sortedData);
    });
    return () => unsubscribe();
  }, []);

  const openModal = () => {
    navigate('/activities/add');
  };

  const moveActivity = async (index, direction) => {
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex >= 0 && newIndex < activities.length) {
      try {
        const updatedActivities = [...activities];
        const temp = updatedActivities[newIndex];
        updatedActivities[newIndex] = updatedActivities[index];
        updatedActivities[index] = temp;
        setActivities(updatedActivities);

        for (let i = 0; i < updatedActivities.length; i++) {
          const activityRef = doc(db, "activities", updatedActivities[i].id);
          await updateDoc(activityRef, { order: i });
        }
      } catch (error) {
        console.error("Error updating document order: ", error);
      }
    }
  };

  const openDeleteModal = (id, name) => {
    setDeleteActivityId(id);
    setDeleteActivityName(name);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setDeleteActivityId(null);
    setDeleteActivityName("");
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "activities", id));
      console.log("Document successfully deleted!");
      closeDeleteModal();
    } catch (error) {
      console.error("Error removing document: ", error);
    }
  };

  return (
    <div className='actContainer'>
      <Sidebar />
      <div className='missionContent'>
        <h2 className="mainHead">จัดการข้อมูลกิจกรรม</h2>
        <div className="mainUnderLine"></div>
        <button className='actAddButton' onClick={openModal}>+ เพิ่ม</button>

        <div className="tableContainer">
          <table className="missionTable">
            <thead>
              <tr className="tableHeader">
                <th>ลำดับ</th>
                <th></th>
                <th></th>
                <th>รูปภาพ</th>
                <th>ชื่อกิจกรรม</th>
                <th>วันที่</th>
                <th>คำอธิบายกิจกรรม</th>
                <th>การจัดการ</th>
              </tr>
            </thead>
            <tbody style={{backgroundColor:'white',color:'black'}}>
              {activities.map((activity, index) => (
                <tr key={activity.id}>
                  <td>
                    {index + 1}
                  </td>
                  <td>
                    <button style={{backgroundColor:'white', color:'green'}} onClick={() => moveActivity(index, "up")} disabled={index === 0}><ArrowUpOutlined /></button>
                  </td>
                  <td>
                    <button style={{backgroundColor:'white', color:'orange'}} onClick={() => moveActivity(index, "down")} disabled={index === activities.length - 1}><ArrowDownOutlined /></button> 
                  </td>
                  <td>
                    <img src={activity.imageURL} alt="Activity" className="actImage" />
                  </td>
                  <td>{activity.name}</td>
                  <td>{format(new Date(activity.date), 'dd/MM/yyyy')}</td>
                  <td>{activity.description}</td>
                  <td>
                    <div className="buttonGroup">
                      <Link to={`/activities/edit/${activity.id}`}><EditOutlined /></Link>
                      <button style={{backgroundColor:'white', color:'red'}} onClick={() => openDeleteModal(activity.id, activity.name)}><DeleteOutlined /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Modal open={showDeleteModal} onClose={closeDeleteModal}>
          <Box className="deleteModal">
            <h2>ยืนยันการลบกิจกรรม</h2>
            <p>คุณต้องการลบ "{deleteActivityName}" หรือไม่?</p>
            <div className="deleteModalButtons">
              <Button variant="contained" color="error" onClick={() => handleDelete(deleteActivityId)}>ลบ</Button>
              <Button variant="contained" onClick={closeDeleteModal}>ยกเลิก</Button>
            </div>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default Act;
