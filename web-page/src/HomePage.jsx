import React, { useState, useEffect } from 'react';
import { Row, Col, Button } from 'antd';
import { PictureOutlined, PlayCircleOutlined, CalendarOutlined } from '@ant-design/icons';
import './HomePage.css';
import './App.css';
import { collection, getDocs, doc, getDoc, onSnapshot } from "firebase/firestore";
import { getDownloadURL , ref} from 'firebase/storage';
import { db, storage } from './firebase';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const HomePage = () => {

  const [coops, setCoops] = useState([]);
  const [staffs, setStaffs] = useState([]);
  const [activities, setActivities] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [aboutData, setAboutData] = useState({
      logoURL: '',
      orgNameEn: '',
      orgNameTh: '',
      history: '',
      video: '',
      videoName: '',
      videoDescription: '',
      objective: '',
    });

  const fetchCoops = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "coops"));
        const newData = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id
        }));
        setCoops(newData);
        console.log(newData);
    } catch (e) {
        console.error("Error fetching documents: ", e);
    }
  }
  useEffect(() => {
    fetchCoops();
  }, []);

  const fetchStaffs = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "staffs"));
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      }));
      setStaffs(newData);
      console.log(newData);
    } catch (e) {
      console.error("Error fetching documents: ", e);
    }
  }

  useEffect(() => {
    fetchStaffs();
  }, []);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const docRef = doc(db, 'about', 'information');
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setAboutData(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document: ", error);
      }
    };

    fetchAboutData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await onSnapshot(collection(db, 'activities'), (snapshot) => {
          const activitiesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setActivities(activitiesData);
        });
        return querySnapshot;
      } catch (error) {
        console.error('Error fetching activities:', error);
      }
    };

    const fetchImages = async () => {
      try {
        const imageDocRef = doc(db, 'actimage', 'uniqueId');
        const imageDocSnapshot = await getDoc(imageDocRef);

        if (imageDocSnapshot.exists()) {
          const imageUrl = imageDocSnapshot.data().url;
          setUploadedImages([imageUrl]);
        } else {
          console.log('No image found in actimage document with uniqueId');
        }
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    };

    fetchData();
    fetchImages();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('th-TH', options).replace(/(\d+)\s(\w+)\s(\d+)/, '$1 $2 $3');
    const [day, monthYear] = formattedDate.split(' ');
    return { day, monthYear: monthYear.replace(/\s+/g, ' ') };
  };

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const unsubscribe = onSnapshot(collection(db, 'gallery'), async (snapshot) => {
          const imageData = await Promise.all(snapshot.docs.map(async (doc) => {
            const data = doc.data();
            const imageUrl = await getDownloadURL(ref(storage, data.imageUrl));
            return { id: doc.id, ...data, imageUrl };
          }));
          setGallery(imageData);
        });
        return unsubscribe;
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchGallery();
  }, []);

  return (
    <div className='HomeContent'>
      <Row>
        <Col span={24}>
          <div>
            <img className='firstImage' src="./images/image51.png" alt="Innovative Processing and Recycling of Metals Research Center" />
            <div className="imageOverlay">
              <p className="overlayText1">Innovative Processing and Recycling <br /> of Metals Research Center (PRMRC)</p>
              <p className='overlayText2'>Suranaree University of Technology</p>
              <Button type="primary" className='overlayButton'>{'ดูเพิ่มเติม >'}</Button>
            </div>
          </div>
        </Col>
      </Row>
      <div>
        <p className='orgHeadWord'> องค์กรที่เกี่ยวข้อง หรือผู้สนับสนุนโครงการ
          <div className='headUnderLine'></div>
        </p>

        <div className='pcRow'>
          <Row style={{ textAlign: 'center', width: '100%' }}>
            {coops.slice(0, 3).map((coop, index) => (
              <Col span={8} key={index}>
                <div className="container">
                  <div className="iconContainer">
                  {coop.imageUrl && <img src={coop.imageUrl} className="hCoopImage" alt={coop.name} />}
                  </div>
                  <div className='organized'>
                    <div className="hCoopData">
                      <p>{coop.name}</p>
                    </div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </div>

        <div className="carousel-container">
          <Slider dots={true} infinite={coops.length > 1} speed={500} slidesToShow={1} slidesToScroll={1}>
            {coops.map((coop, index) => (
              <div key={index}>
                <Row className='coopRow1'>
                  <Col span={24}>
                    <div className="container">
                      <div className="iconContainer3">
                        {coop.imageUrl && <img src={coop.imageUrl} className="hCoopImage" alt={coop.name} />}
                      </div>
                      <div className='organized'>
                        <div className="coopData">
                          <p>{coop.name}</p>
                          <p style={{ color: 'black' }}>{coop.desc}</p>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            ))}
          </Slider>
        </div>  

        <Row style={{ margin: '90px 0' }}>
          <Col span={2}></Col>
          <Col span={20}>
            <div className="servicesImageContainer">
              <img className='serviceImg' src="./images/image21.png" alt="Service" />
              <div className="servicesOverlay">
                <p className='mission'>ภารกิจ</p>
                <div style={{ display: 'flex' }}>
                  <p className='service'>
                    บริการวิชาการต่าง ๆ ให้กับภาคอุตสาหกรรม</p>
                  <Button type="primary" className='serviceButton'>{'ดูเพิ่มเติม >'}</Button>
                </div>
              </div>
            </div>
          </Col>
          <div className='containerUnderline'></div>
          <Col span={2}></Col>
        </Row>

        <div style={{ margin: '-150px 0 0 0' }}>
          <p className='staffHeadword'>
            เจ้าหน้าที่ และ บุคลากร
            <div className='headUnderLine'></div>
          </p>
        </div>
        <div className='pcRow'>
          <Row>
            {staffs.slice(0, 3).map((staff, index) => (
              <Col span={8} key={index}>
                <div className="container">
                  <div className="iconContainer4">
                    {staff.imageUrl ? <img src={staff.imageUrl} className='hStaffImg' alt={staff.name} /> : <PictureOutlined />}
                  </div>
                  <div className='staffName'>
                    <div className="staffData">
                      <p>{staff.name}</p>
                    </div>
                  </div>
                  <div className='hStaffDesc' style={{fontWeight:'bold'}}>
                    <p>{staff.desc}</p>
                  </div>
                  <div className='staffRole'>
                    <p>{staff.subDesc}</p>
                  </div>
                  <div>
                  <Button type="primary" className='hStaffButton'>{'ดูเพิ่มเติม >'}</Button>
                  </div>
                
                </div>
              </Col>
            ))}
          </Row>
        </div>

        <div className="carousel-container3">
          <Slider dots={true} infinite={staffs.length > 1} speed={500} slidesToShow={1} slidesToScroll={1}>
            {staffs.map((staff, index) => (
              <div key={index}>
                <Row className="staffRow">
                  <Col span={24} className="staffCol">
                    <div className="container">
                      <div className="iconContainer4">
                        {staff.imageUrl ? <img src={staff.imageUrl} className="hStaffImg" alt={staff.name} /> : <PictureOutlined />}
                      </div>
                      <div className="staffName">
                        <div className="staffData">
                          <p>{staff.name}</p>
                        </div>
                      </div>
                      <div className="staffDesc">
                        <p>{staff.desc}</p>
                      </div>
                      <div className="staffRole">
                        <p>{staff.subDesc}</p>
                      </div>
                    </div>
                    <Button type="primary" className="hStaffButton">ดูเพิ่มเติม &gt;</Button>
                  </Col>
                </Row>
              </div>
            ))}
          </Slider>
        </div>

        <Row className='History' style={{ width: '80%' }}>
          <Col sm={24} lg={12}>
            <div className='playCircle'>
              <PlayCircleOutlined />
            </div>
          </Col>
          <Col sm={24} lg={12}>
            <p className='abUsHeadWord'>
              ประวัติความเป็นมา
              <div className='headUnderLine'></div>
            </p>
            <div className='abUsContent'>
              {aboutData.history }
            </div>

            <Button type="primary" className='abUsButton'>{'ดูเพิ่มเติม >'}</Button>
          </Col>
          <div className='containerUnderline2'></div>
        </Row>

        <Row style={{ width: '100%' }}>
          <Col sm={24} lg={8} className='homeAct'>
            <p className='actHead'>
              | กิจกรรม
            </p>
            <div>
            {activities.slice(0, 3).map((activity) => {
            const { day, monthYear } = formatDate(activity.date);
            return (
              <div key={activity.id} className='hActivity'>
                <div className='hDateMonth'>
                  {day}<br />
                  <span style={{ fontSize: '14px' }}>{monthYear}</span>
                </div>
                <div className='actName'>
                  {activity.name}
                  <br />
                  <span className='dateTime'>
                    <CalendarOutlined /> {new Date(activity.date).toLocaleDateString('th-TH')}
                  </span>
                  <br />
                  <Button type="primary" className='hActButton'>
                    {'ดูเพิ่มเติม >'}
                  </Button>
                </div>
              </div>
            );
          })}             
            </div>
          </Col>

          <Col sm={24} lg={8} className='homeWork'>
            <p className='workHead'>
              | ผลงานทางวิชาการ
            </p>
            <div className='calendar'>
              <div style={{ color: '#1BB39B', fontSize: '14px' }}>
                <CalendarOutlined /> {'<วันที่ เวลา>'}
                <div className='workName'>
                  ชื่อผลงานทางวิชาการชื่อผลงานทางวิชาการชื่อผลงานทางวิชาการ
                </div>
              </div>
            </div>

            <div className='calendar'>
              <div style={{ color: '#1BB39B', fontSize: '14px' }}>
                <CalendarOutlined /> {'<วันที่ เวลา>'}
                <div className='workName'>
                  ชื่อผลงานทางวิชาการชื่อผลงานทางวิชาการชื่อผลงานทางวิชาการ
                </div>
              </div>
            </div>

            <div className='calendar'>
              <div style={{ color: '#1BB39B', fontSize: '14px' }}>
                <CalendarOutlined /> {'<วันที่ เวลา>'}
                <div className='workName'>
                  ชื่อผลงานทางวิชาการชื่อผลงานทางวิชาการชื่อผลงานทางวิชาการ
                </div>
              </div>
            </div>
          </Col>

          <Col sm={24} lg={8} className='homeGall'>
            <p className='homeGallHead'>
              | แกลอรี่
            </p>
            <div className='gallImg'>
            {gallery.slice(0, 3).map((activity, index) => (
          <div key={index} style={{ margin: '50px 10px 0 80px', display: 'flex' }}>
            <img className='galleryImg' src={activity.imageUrl} style={{width:'10vw', height:'20vh'}} />
            <div className='imgName'>
              {activity.name}
              <br />
              <span
                style={{
                  fontSize: '14px',
                  color: '#1BB39B',
                }}
              >
                <CalendarOutlined /> {new Date(activity.date).toLocaleDateString('th-TH')}
              </span>
            </div>
            <Button className='hImgButton'>{'ดูเพิ่มเติม >'}</Button>
          </div>
        ))}
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default HomePage;
