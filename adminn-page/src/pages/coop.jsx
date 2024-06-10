import React, { useState, useEffect } from "react";
import { DeleteOutlined, EditOutlined, ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { collection, getDocs, deleteDoc, doc, updateDoc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Sidebar from "../components/NavigationMenu";
import './styles/coop.css';
import { useNavigate } from 'react-router-dom'; 

function Coop() {
    const [coops, setCoops] = useState([]);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [deleteCoopId, setDeleteCoopId] = useState(null);
    const [deleteCoopName, setDeleteCoopName] = useState(null);
    const navigate = useNavigate(); 

    const addCoop = () => {
        navigate('/coops/add');
    };

    const editCoop = (id) => {
        navigate(`/coops/edit/${id}`);
    };

    const openDeleteModal = (id, name) => {
        setDeleteModalOpen(true);
        setDeleteCoopId(id);
        setDeleteCoopName(name);
    };
    
    const closeDeleteModal = () => {
        setDeleteModalOpen(false);
        setDeleteCoopId(null);
        setDeleteCoopName(null);
    };

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "coops"), (snapshot) => {
            const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            const sortedData = data.sort((a, b) => a.order - b.order);
            setCoops(sortedData);
        });
        return () => unsubscribe();
    }, []);

    const moveCoop = async (index, direction) => {
        const newIndex = direction === "up" ? index - 1 : index + 1;
        if (newIndex >= 0 && newIndex < coops.length) {
            try {
                const updatedCoops = [...coops];
                const temp = updatedCoops[newIndex];
                updatedCoops[newIndex] = updatedCoops[index];
                updatedCoops[index] = temp;
                setCoops(updatedCoops);
                
                for (let i = 0; i < updatedCoops.length; i++) {
                    const coopRef = doc(db, "coops", updatedCoops[i].id);
                    await updateDoc(coopRef, { order: i });
                }
            } catch (error) {
                console.error("Error updating document order: ", error);
            }
        }
    };

    const handleDeleteConfirmation = async (confirm) => {
        if (confirm) {
            try {
                await deleteDoc(doc(db, "coops", deleteCoopId));
                const updatedCoops = coops.filter((coop) => coop.id !== deleteCoopId);
                setCoops(updatedCoops);
                console.log("Document successfully deleted!");
            } catch (e) {
                console.error("Error removing document: ", e);
            }
        }
        closeDeleteModal(); 
    };

    return (
        <div className='missionContainer'>
            <Sidebar />
            <div className='missionContent'>
                <p className="mainHead">จัดการข้อมูลความร่วมมือด้านวิชาการ</p>
                <div className="missionUnderLine"></div>
                <button className='cAddButton' onClick={addCoop}>+ เพิ่ม</button>
                <div className="tableContainer">
                    <table className="missionTable">
                        <thead>
                            <tr className="tableHeader">
                                <th>ลำดับ</th>
                                <th></th>
                                <th></th>
                                <th>รูปภาพ</th>
                                <th>ชื่อหน่วยงาน</th>
                                <th>จัดการ</th>
                            </tr>
                        </thead>
                        <tbody style={{ backgroundColor: 'white', color: '#4F4F4F' }}>
                            {coops.map((coop, index) => (
                                <tr key={coop.id}>
                                    <td>{index + 1}</td>
                                    <td>
                                        {index > 0 && (
                                            <button style={{ color: 'green', backgroundColor: 'white' }} onClick={() => moveCoop(index, "up")}><ArrowUpOutlined/></button>
                                        )}
                                    </td>
                                    <td>
                                        {index < coops.length - 1 && (
                                            <button style={{ color: 'orange', backgroundColor: 'white' }} onClick={() => moveCoop(index, "down")}><ArrowDownOutlined/></button>
                                        )}
                                    </td>
                                    <td>
                                        {coop.imageUrl ? <img src={coop.imageUrl} alt={coop.name} /> : 'N/A'}
                                    </td>
                                    <td>{coop.name}</td>
                                    <td>
                                        <button style={{ color: '#33363F', backgroundColor: 'white' }} onClick={() => editCoop(coop.id)}><EditOutlined /></button>
                                        <button style={{ color: 'red', backgroundColor: 'white' }} onClick={() => openDeleteModal(coop.id, coop.name)}><DeleteOutlined /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {deleteModalOpen && (
                <Modal open={deleteModalOpen} onClose={closeDeleteModal}>
                    <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4, textAlign: 'center' }}>
                        <p style={{ color: 'red', fontSize: 24 }}>ยืนยันการลบข้อมูล</p>
                        <div className="missionUnderLine"/>
                        <p>คุณต้องการลบข้อมูล "{deleteCoopName}" ใช่หรือไม่?</p>
                        <div className="deleteModalButtons">
                            <Button onClick={() => handleDeleteConfirmation(true)} variant="contained" color="error">ยืนยัน</Button>
                            <Button onClick={() => handleDeleteConfirmation(false)} variant="contained" sx={{marginLeft:'200px', background:'white', color:'#7F8698'}}>ยกเลิก</Button>
                        </div>
                    </Box>
                </Modal>
            )}
        </div>
    );
}

export default Coop;
