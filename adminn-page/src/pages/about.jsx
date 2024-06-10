import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import Sidebar from '../components/NavigationMenu';
import { db, storage } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import './styles/about.css';

const About = () => {
  const [formData, setFormData] = useState({
    orgNameEn: '',
    orgNameTh: '',
    history: '',
    video: '',
    videoName: '',
    videoDescription: '',
    objective: '',
  });

  const [logoFile, setLogoFile] = useState(null);
  const [historyImageFile, setHistoryImageFile] = useState(null);
  const [objectiveImageFile, setObjectiveImageFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState('');
  const [historyImagePreview, setHistoryImagePreview] = useState('');
  const [objectiveImagePreview, setObjectiveImagePreview] = useState('');
  const [videoURL, setVideoURL] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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

  const handleSubmit = async () => {
    try {
      const uploadImage = async (file, filePath) => {
        const fileRef = ref(storage, filePath);
        await uploadBytes(fileRef, file);
        return await getDownloadURL(fileRef);
      };

      const logoURL = logoFile ? await uploadImage(logoFile, `logos/${logoFile.name}`) : logoPreview;
      const historyImageURL = historyImageFile ? await uploadImage(historyImageFile, `history/${historyImageFile.name}`) : historyImagePreview;
      const objectiveImageURL = objectiveImageFile ? await uploadImage(objectiveImageFile, `objective/${objectiveImageFile.name}`) : objectiveImagePreview;

      await setDoc(doc(db, 'about', 'information'), {
        ...formData,
        logoURL,
        historyImageURL,
        objectiveImageURL,
        videoURL: formData.video,
      });

      alert('Data saved successfully!');
    } catch (error) {
      console.error('Error saving data: ', error);
      alert('Failed to save data.');
    }
  };

  const fetchData = async () => {
    try {
      const docRef = doc(db, 'about', 'information');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setFormData({
          orgNameEn: data.orgNameEn || '',
          orgNameTh: data.orgNameTh || '',
          history: data.history || '',
          video: data.video || '',
          videoName: data.videoName || '',
          videoDescription: data.videoDescription || '',
          objective: data.objective || '',
        });
        setLogoPreview(data.logoURL || '');
        setHistoryImagePreview(data.historyImageURL || '');
        setObjectiveImagePreview(data.objectiveImageURL || '');
        setVideoURL(data.videoURL || '');
      } else {
        console.log('No such document!');
      }
    } catch (error) {
      console.error('Error fetching document: ', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className='aboutContainer'>
      <Sidebar />
      <div className='missionContent'>
        <p className="mainHead">จัดการข้อมูลเกี่ยวกับเรา</p>
        <div className="mainUnderLine"></div>
        <div className='aboutContent1'>
          <div className='uploadSection'>
            <label htmlFor='logoUpload' className="uploadLabel">โลโก้</label>
            <div className={`uploadBox ${logoPreview ? 'withPreview' : ''}`}>
              <input type="file" id='logoUpload' accept="image/*" onChange={(e) => handleFileChange(e, setLogoFile, setLogoPreview)} />
              {logoPreview && <img src={logoPreview} alt="Logo Preview" className="imagePreview" />}
            </div>
          </div>
          <div className='formSection'>
            <div className='formGroup'>
              <label htmlFor='orgNameEn'>ชื่อองค์กรภาษาอังกฤษ</label>
              <input type='text' id='orgNameEn' name='orgNameEn' value={formData.orgNameEn} onChange={handleChange} />
            </div>
            <div className='formGroup'>
              <label htmlFor='orgNameTh'>ชื่อองค์กรภาษาไทย</label>
              <input type='text' id='orgNameTh' name='orgNameTh' value={formData.orgNameTh} onChange={handleChange} />
            </div>
          </div>
        </div>

        <div className='aboutContent2'>
          <div className='uploadSection'>
            <label htmlFor='historyImageUpload' className="uploadLabel">ภาพประกอบประวัติความเป็นมา</label>
            <div className={`uploadBox ${historyImagePreview ? 'withPreview' : ''}`}>
              <input type="file" id='historyImageUpload' accept="image/*" onChange={(e) => handleFileChange(e, setHistoryImageFile, setHistoryImagePreview)} />
              {historyImagePreview && <img src={historyImagePreview} alt="History Image Preview" className="imagePreview" />}
            </div>
          </div>
          <div className='formSection'>
            <div className='formGroup'>
              <label htmlFor='history'>ประวัติความเป็นมา</label>
              <input type='text' id='history' name='history' className='bigForm' value={formData.history} onChange={handleChange} />
            </div>  
          </div>
        </div>

        <div className='formSection2'>
          <div className='formGroup'>
            <label htmlFor='video'>วิดีโอประกอบ</label>
            <input type='text' id='video' name='video' value={formData.video} onChange={handleChange} />
          </div>
          <div className='formGroup'>
            <label htmlFor='videoName'>ชื่อวิดีโอประกอบ</label>
            <input type='text' id='videoName' name='videoName' value={formData.videoName} onChange={handleChange} />
          </div>
          <div  className='formGroup'>
            <label htmlFor='videoDescription'>คำอธิบายวิดีโอ</label>
            <input type='text' id='videoDescription' name='videoDescription' className='bigForm' value={formData.videoDescription} onChange={handleChange} />
          </div>
        </div>

        <div className='aboutContent3'>
          <div className='uploadSection'>
            <label htmlFor='objectiveImageUpload' className="uploadLabel">ภาพประกอบวัตถุประสงค์</label>
            <div className={`uploadBox ${objectiveImagePreview ? 'withPreview' : ''}`}>
              <input type="file" id='objectiveImageUpload' accept="image/*" onChange={(e) => handleFileChange(e, setObjectiveImageFile, setObjectiveImagePreview)} />
              {objectiveImagePreview && <img src={objectiveImagePreview} alt="Objective Image Preview" className="imagePreview" />}
            </div>
          </div>
          <div className='formSection'>
            <div className='formGroup'>
              <label htmlFor='objective'>วัตถุประสงค์</label>
              <input type='text' id='objective' name='objective' className='bigForm' value={formData.objective} onChange={handleChange} />
            </div>  
          </div>
        </div>
        <div className='abSubmitButtonContainer'>
          <Button className='abSubmitButton' onClick={handleSubmit}>บันทึก</Button>
        </div>
      </div>
    </div>
  );
};

export default About;
