import React, { useState, useEffect } from 'react';
import { Layout, Menu, Drawer, Button } from 'antd';
import { HomeOutlined, MenuOutlined } from '@ant-design/icons';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import { db } from './firebase';
import { collection, getDocs } from "firebase/firestore";
import HomePage from './HomePage';
import MissionPage from './MissionPage';
import CoopPage from './CoopPage';
import StaffPage from './StaffPage';
import StaffDetailPage from './StaffDetailPage';
import GalleryPage from './GalleryPage';
import GalleryDetailPage from './GalleryDetailPage';
import ActPage from './ActPage';
import ActDetailPage from './ActDetailPage';
import AbusPage from './AbusPage';

const { Header, Content, Footer } = Layout;

const App = () => {
  const [currentMenu, setCurrentMenu] = useState('Home');
  const [open, setOpen] = useState(false);
  const [locations, setLocations] = useState([]);

  const handleMenuClick = (e) => {
    setCurrentMenu(e.key);
    setOpen(false);
  };

  const fetchLocations = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "locations"));
      const newData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setLocations(newData);
      console.log(newData);
    } catch (e) {
      console.error("Error fetching documents: ", e);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const menuItems = [
    { key: 'Home', icon: <HomeOutlined style={{ color: 'green', fontSize: '30px', backgroundColor: 'black' }} />, label: <Link to="/"></Link> },
    { key: 'Mission', label: <Link to="/mission" style={{color:'white'}}>ภารกิจ</Link> },
    { key: 'Coop', label: <Link to="/coop" style={{color:'white'}}>ความร่วมมือ</Link> },
    { key: 'Staff', label: <Link to="/staff" style={{color:'white'}}>บุคลากร</Link> },
    { key: 'Gallery', label: <Link to="/gallery" style={{color:'white'}}>แกลอรี่</Link> },
    { key: 'Activity', label: <Link to="/activity" style={{color:'white'}}>กิจกรรม</Link> },
    { key: 'AboutUs', label: <Link to="/aboutus" style={{color:'white'}}>เกี่ยวกับเรา</Link> },
  ];

  return (
    <Router>
      <Layout className='HomePage' style={{ width: '100vw' }}>
        <Header className='Header' style={{ position: 'fixed', zIndex: '1000', width: '100%' }}>
          <div className="logo">
            <img src="/images/image11.png" className="logo-image" alt="logo" />
            <div className='firstWord'>
              ศูนย์วิจัยนวัตกรรมการผลิตและรีไซเคิลโลหะ
            </div>
          </div>
          <div className="mobile-menu-button">
            <Button type="primary" onClick={showDrawer} icon={<MenuOutlined />} />
          </div>
          <div className="desktop-menu">
            <Menu className='Menu' mode="horizontal" selectedKeys={[currentMenu]} onClick={handleMenuClick} items={menuItems} />
          </div>
        </Header>

        <Drawer
          title="Menu"
          placement="top"
          closable={true}
          onClose={onClose}
          open={open}
        >
          <Menu mode="vertical" selectedKeys={[currentMenu]} onClick={handleMenuClick} items={menuItems} />
        </Drawer>

        <Content className="content-container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/mission" element={<MissionPage />} />
            <Route path="/coop" element={<CoopPage />} />
            <Route path="/staff" element={<StaffPage />} />
            <Route path="/staff/:id" element={<StaffDetailPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/gallery/:id" element={<GalleryDetailPage />} />
            <Route path="/activity" element={<ActPage />} />
            <Route path="/activity/:id" element={<ActDetailPage />} />
            <Route path="/aboutus" element={<AbusPage />} />
          </Routes>
        </Content>

        <Footer className='footerBlock'>
          <div className='footerHead'>
            Contact us / ติดต่อเรา
            {locations.map(location => (
              <div key={location.id} className='footerContent'>
                <div>
                {location.englishAddress}
                </div>
                <br/>
                {location.thaiAddress}
                <div className='footerContent'>
                  E-mail / อีเมล : {location.email}
                </div>
                <div className='footerContent'>
                  Phone / โทรศัพท์ : {location.contactNumber}
                </div>
              </div>
            ))}
          </div>
        </Footer>
      </Layout>
    </Router>
  );
};

export default App;
