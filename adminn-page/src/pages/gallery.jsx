import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom'; 
import Sidebar from '../components/NavigationMenu';
import { DeleteOutlined, EditOutlined, ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import './styles/gallery.css';
import { db, storage } from '../firebase';
import { collection, onSnapshot, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { ref, getDownloadURL, deleteObject } from 'firebase/storage';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

const Gallery = () => {
  const [gallery, setGallery] = useState([]);
  const navigate = useNavigate(); 
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedGalleryId, setSelectedGalleryId] = useState(null);
  const [selectedGalleryName, setSelectedGalleryName] = useState("");

  const addGallery = () => {
    navigate("/gallery/add");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const unsubscribe = onSnapshot(collection(db, 'gallery'), async (snapshot) => {
          const imageData = await Promise.all(snapshot.docs.map(async (doc) => {
            const data = doc.data();
            const imageUrl = await getDownloadURL(ref(storage, data.imageUrl));
            return { id: doc.id, ...data, imageUrl };
          }));

          // Sort by order field
          imageData.sort((a, b) => a.order - b.order);
          setGallery(imageData);
        });
        return unsubscribe;
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id, imageUrl) => {
    try {
      await deleteDoc(doc(db, 'gallery', id));
      await deleteObject(ref(storage, imageUrl));
      closeDeleteModal();

      // Update the order of the remaining items
      const updatedGallery = gallery.filter(g => g.id !== id).map((g, index) => ({ ...g, order: index }));
      setGallery(updatedGallery);

      for (let i = 0; i < updatedGallery.length; i++) {
        const galleryRef = doc(db, 'gallery', updatedGallery[i].id);
        await updateDoc(galleryRef, { order: i });
      }
    } catch (error) {
      console.error('Error deleting document:', error);
    }
  };

  const moveGallery = async (index, direction) => {
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex >= 0 && newIndex < gallery.length) {
      try {
        const updatedGalleries = [...gallery];
        const temp = updatedGalleries[newIndex];
        updatedGalleries[newIndex] = updatedGalleries[index];
        updatedGalleries[index] = temp;

        // Swap order fields
        const orderTemp = updatedGalleries[newIndex].order;
        updatedGalleries[newIndex].order = updatedGalleries[index].order;
        updatedGalleries[index].order = orderTemp;

        setGallery(updatedGalleries);

        // Update Firestore
        await updateDoc(doc(db, "gallery", updatedGalleries[newIndex].id), { order: updatedGalleries[newIndex].order });
        await updateDoc(doc(db, "gallery", updatedGalleries[index].id), { order: updatedGalleries[index].order });

        console.log("Document order successfully updated!");
      } catch (error) {
        console.error("Error updating document order: ", error);
      }
    }
  };

  const openDeleteModal = (id, name) => {
    setSelectedGalleryId(id);
    setSelectedGalleryName(name);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedGalleryId(null);
    setSelectedGalleryName("");
  };

  return (
    <div className="gallContainer">
      <Sidebar />
      <div className="missionContent">
        <p className="mainHead">จัดการข้อมูลภาพกิจกรรม และแกลอรี่</p>
        <div className="mainUnderLine"></div>
        <button className="gAddButton" onClick={addGallery}>
          + เพิ่ม
        </button>

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
                <th>จัดการ</th>
              </tr>
            </thead>
            <tbody style={{ backgroundColor: 'white' }}>
              {gallery.map((gall, index) => (
                <tr key={gall.id} style={{ color: 'black' }}>
                  <td>{index + 1}</td>
                  <td>
                    {index > 0 && (
                      <button style={{ color: 'green', backgroundColor: 'white' }} onClick={() => moveGallery(index, "up")}><ArrowUpOutlined/></button>
                    )}
                  </td>
                  <td>
                    {index < gallery.length - 1 && (
                      <button style={{ color: 'orange', backgroundColor: 'white' }} onClick={() => moveGallery(index, "down")}><ArrowDownOutlined/></button>
                    )}
                  </td>
                  <td>
                    <img src={gall.imageUrl} alt={gall.name} style={{ width: '100px' }} />
                  </td>
                  <td>{gall.name}</td>
                  <td>{new Date(gall.date).toLocaleDateString('th-TH')}</td>
                  <td>
                    <Link to={`/gallery/edit/${gall.id}`} style={{ color: 'blue', backgroundColor: 'white' }}>
                      <EditOutlined />
                    </Link>
                    <button onClick={() => openDeleteModal(gall.id, gall.name)} style={{ color: 'red', backgroundColor: 'white' }}><DeleteOutlined /></button>
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
            <div className="mainUnderLine"/>
            <p>คุณต้องการลบรูปภาพ {selectedGalleryName} ใช่หรือไม่?</p>
            <div className="modal-buttons">
              <br/>
              <Button onClick={() => handleDelete(selectedGalleryId, gallery.find(g => g.id === selectedGalleryId)?.imageUrl)} variant="contained" color="error">ยืนยัน</Button>
              <Button onClick={closeDeleteModal} variant="contained" sx={{marginLeft:'200px', background:'white', color:'#7F8698'}}>ยกเลิก</Button>
            </div>
          </Box>
        </Modal>
      )}
    </div>
  );
};

export default Gallery;
