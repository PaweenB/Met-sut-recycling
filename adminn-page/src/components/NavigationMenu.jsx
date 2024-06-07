import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'antd';
import './sidebar.css';
import {
  BarChartOutlined,
  CompassOutlined,
  ContainerOutlined,
  UserOutlined,
  PictureOutlined,
  CalendarOutlined,
  SettingOutlined,
  LogoutOutlined
} from '@ant-design/icons';

const Sidebar = () => {
  const location = useLocation();

  const getKeyFromPathname = (pathname) => {
    switch (pathname) {
      case '/main':
        return '1';
      case '/missions':
        return '2';
      case '/coop':
        return '3';
      case '/staff':
        return '4';
      case '/gallery':
        return '5';
      case '/activities':
        return '6';
      case '/about':
        return '7';
      case '/location':
        return '8';
      case '/settings':
        return '9';
      default:
        return '10'; // for '/'
    }
  };

  const selectedKey = getKeyFromPathname(location.pathname);

  const mainItems = [
    {
      key: '1',
      icon: <BarChartOutlined className="whiteText" />,
      label: <Link to="/main" className="whiteText">หน้าหลัก</Link>
    },
    {
      key: '2',
      icon: <CompassOutlined className="whiteText" />,
      label: <Link to="/missions" className="whiteText">ภารกิจ</Link>
    },
    {
      key: '3',
      icon: <ContainerOutlined className="whiteText" />,
      label: <Link to="/coop" className="whiteText">ความร่วมมือ</Link>
    },
    {
      key: '4',
      icon: <UserOutlined className="whiteText" />,
      label: <Link to="/staff" className="whiteText">เจ้าหน้าที่</Link>
    },
    {
      key: '5',
      icon: <PictureOutlined className="whiteText" />,
      label: <Link to="/gallery" className="whiteText">แกลอรี่</Link>
    },
    {
      key: '6',
      icon: <CalendarOutlined className="whiteText" />,
      label: <Link to="/activities" className="whiteText">กิจกรรม</Link>
    },
    {
      key: '7',
      icon: <CalendarOutlined className="whiteText" />,
      label: <Link to="/about" className="whiteText">เกี่ยวกับเรา</Link>
    },
    {
      key: '8',
      icon: <CalendarOutlined className="whiteText" />,
      label: <Link to="/location" className="whiteText">ที่อยู่</Link>
    }
  ];

  const bottomItems = [
    {
      key: '9',
      icon: <SettingOutlined className="whiteText" />,
      label: <Link to="/settings" className="whiteText">ตั้งค่า</Link>
    },
    {
      key: '10',
      icon: <LogoutOutlined className="whiteText" />,
      label: <Link to="/" className="whiteText">ออกจากระบบ</Link>
    }
  ];

  return (
    <div className="sidebar">
      <div className="avatar-container">
        <UserOutlined className="user-avatar" />
      </div>
      <Menu
        mode="inline"
        selectedKeys={[selectedKey]}
        items={mainItems}
        style={{ width: 200, backgroundColor: '#273B4A' }}
      />
      <Menu
        mode="inline"
        selectedKeys={[selectedKey]}
        items={bottomItems}
        className="bottom-menu"
        style={{ width: 200, backgroundColor: '#273B4A', marginTop: 'auto' }}
      />
    </div>
  );
};

export default Sidebar;
