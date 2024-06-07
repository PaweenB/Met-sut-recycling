import React, { useState } from 'react';
import { Row, Col } from 'antd';
import Sidebar from '../components/NavigationMenu';
import { db, storage } from '../firebase';
import { collection, addDoc, getDocs } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import './AddStaff.css';
import { useNavigate } from 'react-router-dom';

function AddStaff() {
    const [prefix, setPrefix] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [desc, setDesc] = useState("");
    const [subDesc, setSubDesc] = useState("");
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [position, setPosition] = useState("เจ้าหน้าที่");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let imageUrl = "";
            if (image) {
                const storageRef = ref(storage, `staffImages/${image.name}`);
                await uploadBytes(storageRef, image);
                imageUrl = await getDownloadURL(storageRef);
            }

            const staffsSnapshot = await getDocs(collection(db, "staffs"));
            const newOrder = staffsSnapshot.docs.length; // Set order to the number of existing staffs
            
            const newStaff = {
                prefix,
                firstName,
                lastName,
                desc,
                subDesc,
                position,
                imageUrl,
                order: newOrder
            };
            
            await addDoc(collection(db, "staffs"), newStaff);
            navigate('/staff');
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setImagePreview(null);
        }
    };

    return (
        <div className='missionContainer'>
            <Sidebar />
            <div className='missionContent'>
                <p className="mainHead">เพิ่มข้อมูลเจ้าหน้าที่ และบุคลากร</p>
                <div className="missionUnderLine"></div>
                <form onSubmit={handleSubmit}>
                    <Row>
                        <Col lg={10}>
                            <div className="file-upload">
                                <label htmlFor="file-input">
                                    <p style={{ fontSize: '20px' }}>รูปภาพ</p>
                                    {imagePreview ? (
                                        <img src={imagePreview} alt="Preview" className="staffImg" />
                                    ) : (
                                        <div className="upload-placeholder">
                                            <span>Upload Image</span>
                                        </div>
                                    )}
                                </label>
                                <input id="file-input" type="file" onChange={handleImageChange} accept="image/*" />
                            </div>
                        </Col>
                        <Col lg={14}>
                            <p>คำนำหน้า</p>
                            <input className='input-field' type="text" value={prefix} onChange={(e) => setPrefix(e.target.value)} />
                            <p>ชื่อจริง</p>
                            <input className='input-field' type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                            <p>นามสกุล</p>
                            <input className='input-field' type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                            <p>ตำแหน่ง</p>
                            <input className='input-field' type="text" value={desc} onChange={(e) => setDesc(e.target.value)} />
                            <p>บทบาท</p>
                            <input className='input-field' type="text" value={subDesc} onChange={(e) => setSubDesc(e.target.value)} />
                            <p>กลุ่ม</p>
                            <select className='input-field' value={position} onChange={(e) => setPosition(e.target.value)}>
                                <option value="เจ้าหน้าที่">เจ้าหน้าที่</option>
                                <option value="บุคลากร">บุคลากร</option>
                            </select>
                            <button className='submit-button' type="submit">ยืนยัน</button>
                        </Col>
                    </Row>
                </form>
            </div>
        </div>
    );
}

export default AddStaff;
