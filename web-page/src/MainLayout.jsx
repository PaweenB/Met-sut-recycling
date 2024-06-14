import React, { useState } from 'react';
import { Layout, Menu, Drawer, Button } from 'antd';
import { HomeOutlined, MenuOutlined } from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import './App.css';

const { Header, Content, Footer } = Layout;

const MainLayout = ({ children, locations }) => {
  const [currentMenu, setCurrentMenu] = useState('Home');
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const handleMenuClick = (e) => {
    setCurrentMenu(e.key);
    setOpen(false);
  };

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const menuItems = [
    { key: 'Home', icon: <HomeOutlined className='homeIcon' />, label: <Link to="/"></Link> },
    { key: 'Mission', label: <Link to="/mission" className='menuItem'>ภารกิจ</Link> },
    { key: 'Coop', label: <Link to="/coop" className='menuItem'>ความร่วมมือ</Link> },
    { key: 'Staff', label: <Link to="/staff" className='menuItem'>บุคลากร</Link> },
    { key: 'Gallery', label: <Link to="/gallery" className='menuItem'>แกลอรี่</Link> },
    { key: 'Activity', label: <Link to="/activity" className='menuItem'>กิจกรรม</Link> },
    { key: 'AboutUs', label: <Link to="/aboutus" className='menuItem'>เกี่ยวกับเรา</Link> },
  ];

  const contentClass = location.pathname.startsWith('/staff/') ? 'staff-detail-page' : '';

  return (
    <Layout className='HomePage' style={{ width: '100vw' }}>
      <Header className='Header' style={{ position: 'fixed', zIndex: '1000', width: '100%' }}>
        <div className="logo">
          <img src="/images/image11.png" className="logo-image"  />
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

      <Content className={`content-container ${contentClass}`} data-page={location.pathname.slice(1)}>
        {children}
      </Content>

      <Footer className='footerBlock'>
        <div className='footerHead'>
          Contact us / ติดต่อเรา
          {locations.map(location => (
            <div key={location.id} className='footerContent'>
              <div>
                {location.englishAddress}
              </div>
              <br />
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
  );
};

export default MainLayout;
