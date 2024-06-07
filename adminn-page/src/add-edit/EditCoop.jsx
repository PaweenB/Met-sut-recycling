import React, { useState, useEffect } from "react";
import Sidebar from "../components/NavigationMenu";
import { useNavigate, useParams } from "react-router-dom";
import { ref } from "firebase/storage";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebase";
import "./AddMission.css";
import { Col, Row } from "antd";

const EditCoop = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    const fetchCoop = async () => {
      try {
        const docRef = doc(db, "coops", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setName(data.name);
          setImagePreview(data.imageUrl);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document: ", error);
      }
    };
    fetchCoop();
  }, [id]);

  const handleSubmit = async () => {
    try {
      const docRef = doc(db, "coops", id);
      const dataToUpdate = {
        name: name,
      };
      if (image) {
        const storageRef = ref(storage, `images/${image.name}`);
        await uploadBytes(storageRef, image);
        const imageUrl = await getDownloadURL(storageRef);
        dataToUpdate.imageUrl = imageUrl;
      }
      await updateDoc(docRef, dataToUpdate);
      navigate("/coop");
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  const handleCancel = () => {
    navigate("/coop");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  return (
    <div className="addMissionContainer">
      <Sidebar />
      <div className="addMissionContent">
        <p className="addMissionHead">แก้ไขข้อมูลความร่วมมือด้านวิชาการ</p>
        <div className="missionUnderLine"></div>
        <div className="addMissionForm">
          <Row>
            <Col lg={8}>
              <label className="formHead">รูปภาพ</label>
              <div className="circularFrame" onClick={() => document.getElementById("imageInput").click()}>
                {imagePreview ? (
                  <img className="previewImage" src={imagePreview} alt="Preview" />
                ) : (
                  <div className="uploadIcon"></div>
                )}
              </div>
              <input type="file" accept="image/*" id="imageInput" style={{ display: "none" }} onChange={handleImageChange} />
            </Col>
            <Col lg={16}>
              <label className="formHead">ชื่อหน่วยงาน</label>
              <input className="addMissionInput" value={name} onChange={(e) => setName(e.target.value)} />
            </Col>
          </Row>
          <div className="addMissionButton">
            <button className="submitButton" onClick={handleSubmit}>
              บันทึก
            </button>
            <button className="cancelButton" onClick={handleCancel}>
              ยกเลิก
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCoop;
