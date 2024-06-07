import React, { useState, useEffect } from 'react';
import { DeleteOutlined, EditOutlined, ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { collection, getDocs, deleteDoc, doc, updateDoc, onSnapshot } from "firebase/firestore";
import { db } from '../firebase';   
import Sidebar from '../components/NavigationMenu';
import './styles/staff.css';
import { useNavigate } from 'react-router-dom'; 
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

function Staff() {
    const [staffs, setStaffs] = useState([]);
    const navigate = useNavigate();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedStaffId, setSelectedStaffId] = useState(null);
    const [selectedStaffName, setSelectedStaffName] = useState("");

    const fetchStaffs = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "staffs"));
            const newData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            const sortedData = newData.sort((a, b) => a.order - b.order);
            setStaffs(sortedData);
        } catch (e) {
            console.error("Error fetching documents: ", e);
        }
    };

    useEffect(() => {
        fetchStaffs();
    }, []);

    const deleteStaff = async (id) => {
        try {
            await deleteDoc(doc(db, "staffs", id));
            fetchStaffs();
            closeDeleteModal();
        } catch (e) {
            console.error("Error removing document: ", e);
        }
    };

    const openEditModal = (staff) => {
        navigate(`/staffs/edit/${staff.id}`);
    };

    const moveStaff = async (index, direction) => {
        const newIndex = direction === "up" ? index - 1 : index + 1;
        if (newIndex >= 0 && newIndex < staffs.length) {
            try {
                const updatedStaffs = [...staffs];
                const temp = updatedStaffs[newIndex];
                updatedStaffs[newIndex] = updatedStaffs[index];
                updatedStaffs[index] = temp;
                setStaffs(updatedStaffs);
                
                for (let i = 0; i < updatedStaffs.length; i++) {
                    const staffRef = doc(db, "staffs", updatedStaffs[i].id);
                    await updateDoc(staffRef, { order: i });
                }
            } catch (error) {
                console.error("Error updating document order: ", error);
            }
        }
    };

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "staffs"), (snapshot) => {
            const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            const sortedData = data.sort((a, b) => a.order - b.order);
            setStaffs(sortedData);
        });
        return () => unsubscribe();
    }, []);

    const openDeleteModal = (id, name) => {
        setSelectedStaffId(id);
        setSelectedStaffName(name);
        setShowDeleteModal(true);
    };
    
    const closeDeleteModal = () => {
        setShowDeleteModal(false);
        setSelectedStaffId(null);
        setSelectedStaffName("");
    };

    return (
        <div className='missionContainer'>
            <Sidebar />
            <div className='missionContent'>
                <p className="mainHead">จัดการข้อมูลเจ้าหน้าที่ และบุคลากร</p>
                <div className="missionUnderLine"></div>
                <button className='sAddButton' onClick={() => navigate('/staffs/add')}>+ เพิ่ม</button>

                <div className="tableContainer">
                    <table className="missionTable">
                        <thead>
                            <tr className="tableHeader">
                                <th>ลำดับ</th>
                                <th></th>
                                <th></th>
                                <th>รูปภาพ</th>
                                <th>ชื่อ</th>
                                <th>ตำแหน่ง</th>
                                <th>บทบาท</th>
                                <th>จัดการ</th>
                            </tr>
                        </thead>
                        <tbody style={{ backgroundColor: 'white', color: '#4F4F4F' }}>
                            {staffs.map((staff, index) => (
                                <tr key={staff.id}>
                                    <td>{index + 1}</td>
                                    <td>
                                        {index > 0 && (
                                            <button style={{ color: 'green', backgroundColor: 'white' }} onClick={() => moveStaff(index, "up")}><ArrowUpOutlined /></button>
                                        )}
                                    </td>
                                    <td>
                                        {index < staffs.length - 1 && (
                                            <button style={{ color: 'orange', backgroundColor: 'white' }} onClick={() => moveStaff(index, "down")}><ArrowDownOutlined /></button>
                                        )}
                                    </td>
                                    <td>
                                        {staff.imageUrl ? <img src={staff.imageUrl} alt="Staff" /> : 'N/A'}
                                    </td>
                                    <td>{`${staff.prefix} ${staff.firstName} ${staff.lastName}`}</td>
                                    <td>{staff.desc}</td>
                                    <td>{staff.subDesc}</td>
                                    <td>
                                        <button style={{ color: '#33363F', backgroundColor: 'white' }} onClick={() => openEditModal(staff)}><EditOutlined /></button>
                                        <button style={{ color: 'red', backgroundColor: 'white' }} onClick={() => openDeleteModal(staff.id, `${staff.prefix} ${staff.firstName} ${staff.lastName}`)}><DeleteOutlined /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {showDeleteModal && (
                <Modal open={showDeleteModal} onClose={closeDeleteModal}>
                    <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4, textAlign: 'center' }}>
                        <p style={{ color: 'red', fontSize: 24 }}>ยืนยันการลบข้อมูล</p>
                        <div className="missionUnderLine"/>
                        <p>คุณต้องการลบข้อมูลเจ้าหน้าที่ {selectedStaffName} ใช่หรือไม่?</p>
                        <div className="modal-buttons">
                            <br/>
                            <Button onClick={() => deleteStaff(selectedStaffId)} variant="contained" color="error">ยืนยัน</Button>
                            <Button onClick={closeDeleteModal} variant="contained" sx={{marginLeft:'200px', background:'white', color:'#7F8698'}}>ยกเลิก</Button>
                        </div>
                    </Box>
                </Modal>
            )}
        </div>
    );
}

export default Staff;
