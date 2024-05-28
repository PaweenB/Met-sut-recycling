import React, { useState } from 'react';
import { Layout, Menu, Drawer, Button } from 'antd';
import { HomeOutlined, MenuOutlined } from '@ant-design/icons';
import './App.css';

import HomePage from './HomePage';
import MissionPage from './MissionPage';
import CoopPage from './CoopPage';
import StaffPage from './StaffPage';
import GalleryPage from './GalleryPage';
import ActPage from './ActPage';
import AbusPage from './AbusPage';

const { Header, Content, Footer } = Layout;

const App = () => {
  const [currentMenu, setCurrentMenu] = useState('Home');
  const [visible, setVisible] = useState(false);

  const handleMenuClick = (e) => {
    setCurrentMenu(e.key);
    setVisible(false);
  };

  const menuContentMap = {
    Home: <HomePage />,
    Mission: <MissionPage />,
    Coop: <CoopPage />,
    Staff: <StaffPage />,
    Gallery: <GalleryPage />,
    Activity: <ActPage />,
    AboutUs: <AbusPage />,
  };

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    
    <Layout className='HomePage' style={{ width: '100vw' }}>
      <Header className='Header' style={{ position: 'fixed', zIndex: '1000', width: '100%' }}>
        <div className="logo">
          <img src="/images/image11.png" className="logo-image" alt="logo" />
          <div className='firstWord' >
            ศูนย์วิจัยนวัตกรรมการผลิตและรีไซเคิลโลหะ
          </div>
        </div>
        <div className="mobile-menu-button">
          <Button type="primary" onClick={showDrawer} icon={<MenuOutlined />} />
        </div>
        <div className="desktop-menu">
          <Menu className='Menu' mode="horizontal" selectedKeys={[currentMenu]} onClick={handleMenuClick}>
            <Menu.Item key="Home">
              <HomeOutlined style={{ color: 'green', fontSize: '30px', backgroundColor: 'black' }} />
            </Menu.Item>
            <Menu.Item key="Mission" style={{ color: 'white' }}>ภารกิจ</Menu.Item>
            <Menu.Item key="Coop" style={{ color: 'white' }}>ความร่วมมือ</Menu.Item>
            <Menu.Item key="Staff" style={{ color: 'white' }}>บุคลากร</Menu.Item>
            <Menu.Item key="Gallery" style={{ color: 'white' }}>แกลอรี่</Menu.Item>
            <Menu.Item key="Activity" style={{ color: 'white' }}>กิจกรรม</Menu.Item>
            <Menu.Item key="AboutUs" style={{ color: 'white' }}>เกี่ยวกับเรา</Menu.Item>
          </Menu>
        </div>
      </Header>

      <Drawer
        title="Menu"
        placement="top"
        closable={true}
        onClose={onClose}
        visible={visible}
      >
        <Menu mode="vertical" selectedKeys={[currentMenu]} onClick={handleMenuClick}>
          <Menu.Item key="Home" icon={<HomeOutlined />}>
            Home
          </Menu.Item>
          <Menu.Item key="Mission">ภารกิจ</Menu.Item>
          <Menu.Item key="Coop">ความร่วมมือ</Menu.Item>
          <Menu.Item key="Staff">บุคลากร</Menu.Item>
          <Menu.Item key="Gallery">แกลอรี่</Menu.Item>
          <Menu.Item key="Activity">กิจกรรม</Menu.Item>
          <Menu.Item key="AboutUs">เกี่ยวกับเรา</Menu.Item>
        </Menu>
      </Drawer>

      <Content className="content-container" data-page={currentMenu}>
        {menuContentMap[currentMenu]}
      </Content>

      <Footer className='footerBlock'>
        <div className='footerHead'>
          Contact us / ติดต่อเรา
          <div className='footerContent'>
            School of Metallurgical Engineering, Institute of Engineering, Suranaree University of Technology
            1 11 University Avenue, Suranaree Sub-District, Muang Nakhon Ratchasima District,
            Nakhon Ratchasima 30000 Thailand
          </div>
          <div className='footerContent'>
            สาขาวิชาวิศวกรรมโลหการ สำนักวิชาวิศวกรรมศาสตร์ มหาวิทยาลัยเทคโนโลยีสุรนารี 111 ถนนมหาวิทยาลัย
            ตำบลสุรนารี อำเภอเมือง จังหวัดนครราชสีมา 30000
          </div>
          <div className='footerContent'>
            E-mail / อีเมล : iprmrc@sut.ac.th
          </div>
          <div className='footerContent'>
            Phone / โทรศัพท์ : 061 - 969 - 5469
          </div>
        </div>
      </Footer>
    </Layout>
  );
};

export default App;
