import React, { useState, useEffect } from 'react';
import { Row, Col, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { db, storage } from '../firebase';
import { setDoc, doc, onSnapshot } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Sidebar from '../components/NavigationMenu';
import './styles/mainpage.css';

function Main() {
  const navigate = useNavigate();
  const [title1, setTitle1] = useState('');
  const [title2, setTitle2] = useState('');
  const [title3, setTitle3] = useState('');
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image1Preview, setImage1Preview] = useState('');
  const [image2Preview, setImage2Preview] = useState('');
  const [image3Preview, setImage3Preview] = useState('');
  const [exampleData, setExampleData] = useState({});

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'examples', 'new-example-id'), (doc) => {
      if (doc.exists()) {
        setExampleData(doc.data());
      } else {
        console.log("No such document!");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleFileChange = (e, setFile, setPreview) => {
    const file = e.target.files[0];
    setFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview('');
    }
  };

  const uploadImage = async (file, filePath) => {
    const fileRef = ref(storage, filePath);
    await uploadBytes(fileRef, file);
    return await getDownloadURL(fileRef);
  };

  const handleSubmit1 = async () => {
    try {
      const image1URL = image1 ? await uploadImage(image1, `examples/image1/${image1.name}`) : '';
      await setDoc(doc(db, 'examples', 'new-example-id'), { ...exampleData, title: title1, image1URL });
      console.log("Document 1 successfully written!");
    } catch (error) {
      console.error("Error writing document 1: ", error);
    }
  };

  const handleSubmit2 = async () => {
    try {
      const image2URL = image2 ? await uploadImage(image2, `examples/image2/${image2.name}`) : '';
      await setDoc(doc(db, 'examples', 'new-example-id'), { ...exampleData, title2: title2, image2URL });
      console.log("Document 2 successfully written!");
    } catch (error) {
      console.error("Error writing document 2: ", error);
    }
  };

  const handleSubmit3 = async () => {
    try {
      const image3URL = image3 ? await uploadImage(image3, `examples/image3/${image3.name}`) : '';
      await setDoc(doc(db, 'examples', 'new-example-id'), { ...exampleData, title3: title3, image3URL });
      console.log("Document 3 successfully written!");
    } catch (error) {
      console.error("Error writing document 3: ", error);
    }
  };

  const handleDrop = (e, setFile, setPreview) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleFileChange({ target: { files: [file] } }, setFile, setPreview);
  };

  return (
    <div className="mainContainer">
      <Sidebar />
      <div className="mainContent">
        <p className="mainHead">จัดการข้อมูลหน้าหลัก</p>
        <div className="mainUnderLine"></div>
        <Row>
          <Col lg={8}>
            <p className='mainExample'>ตัวอย่างการแสดงผล</p>
            <div className='imgExample'>
              <img className='examplePic' src={exampleData.image1URL} />
              <p className='exampleText'>{exampleData.title }</p>
              <img className='examplePic' src={exampleData.image2URL } />
              <p className='exampleText'>{exampleData.title2 }</p>
              <img className='examplePic' src={exampleData.image3URL } />
              <p className='exampleText'>{exampleData.title3 }</p>
            </div>
          </Col>
          <Col lg={16}>
            <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
              <div className="contentLine" />
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', paddingLeft: '16px', width: '100%' }}>
                <p style={{ color: '#7F8698', margin: '16px 0' }} className='mainNumber'>ลำดับที่ 1</p>
                <div style={{ display: 'flex' }}>
                  <div
                    className={`uploadBox ${image1Preview ? 'withPreview' : ''}`}
                    onClick={() => document.getElementById('imageInput1').click()}
                    onDrop={(e) => handleDrop(e, setImage1, setImage1Preview)}
                    onDragOver={(e) => e.preventDefault()}
                  >
                    <input
                      type="file"
                      id="imageInput1"
                      className="hiddenFileInput"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, setImage1, setImage1Preview)}
                    />
                    {image1Preview ? (
                      <img src={image1Preview}  className="imagePreview" />
                    ) : null}
                  </div>
                  <form style={{ marginLeft: '60px' }}>
                    <label htmlFor="titleInput1" className='mainInputHead'>ชื่อหัวข้อ:</label>
                    <input type="text" id="titleInput1" name="titleInput1" value={title1} onChange={(e) => setTitle1(e.target.value)} style={{ width: '200%', height: '35px', backgroundColor: 'white', color: 'black' }} />
                  </form>
                </div>
                <div className='mSubmitButtonContainer'>
                  <Button className='mSubmitButton' onClick={handleSubmit1}>บันทึก</Button>
                </div>
                <p style={{ color: '#7F8698', margin: '16px 0' }} className='mainNumber'>ลำดับที่ 2</p>
                <div style={{ display: 'flex' }}>
                  <div
                    className={`uploadBox ${image2Preview ? 'withPreview' : ''}`}
                    onClick={() => document.getElementById('imageInput2').click()}
                    onDrop={(e) => handleDrop(e, setImage2, setImage2Preview)}
                    onDragOver={(e) => e.preventDefault()}
                  >
                    <input
                      type="file"
                      id="imageInput2"
                      className="hiddenFileInput"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, setImage2, setImage2Preview)}
                    />
                    {image2Preview ? (
                      <img src={image2Preview}  className="imagePreview" />
                    ) : null}
                  </div>
                  <form style={{ marginLeft: '60px' }}>
                    <label htmlFor="titleInput2" className='mainInputHead'>ชื่อหัวข้อ:</label>
                    <input type="text" id="titleInput2" name="titleInput2" value={title2} onChange={(e) => setTitle2(e.target.value)} style={{ width: '200%', height: '35px', backgroundColor: 'white', color: 'black' }} />
                  </form>
                </div>
                <div className='mSubmitButtonContainer'>
                  <Button className='mSubmitButton' onClick={handleSubmit2}>บันทึก</Button>
                </div>
                <p style={{ color: '#7F8698', margin: '16px 0' }} className='mainNumber'>ลำดับที่ 3</p>
                <div style={{ display: 'flex' }}>
                  <div
                    className={`uploadBox ${image3Preview ? 'withPreview' : ''}`}
                    onClick={() => document.getElementById('imageInput3').click()}
                    onDrop={(e) => handleDrop(e, setImage3, setImage3Preview)}
                    onDragOver={(e) => e.preventDefault()}
                  >
                    <input
                      type="file"
                      id="imageInput3"
                      className="hiddenFileInput"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, setImage3, setImage3Preview)}
                    />
                    {image3Preview ? (
                      <img src={image3Preview}  className="imagePreview" />
                    ) : null}
                  </div>
                  <form style={{ marginLeft: '60px' }}>
                    <label htmlFor="titleInput3" className='mainInputHead'>ชื่อหัวข้อ:</label>
                    <input type="text" id="titleInput3" name="titleInput3" value={title3} onChange={(e) => setTitle3(e.target.value)} style={{ width: '200%', height: '35px', backgroundColor: 'white', color: 'black' }} />
                  </form>
                </div>
                <div className='mSubmitButtonContainer'>
                  <Button className='mSubmitButton' onClick={handleSubmit3}>บันทึก</Button>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Main;
