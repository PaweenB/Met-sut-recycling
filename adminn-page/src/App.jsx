import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './pages/styles/App.css';
import Coop from './pages/coop';
import AddCoop from './add-edit/AddCoop';
import EditCoop from './add-edit/EditCoop';
import Staff from './pages/staff';
import AddStaff from './add-edit/AddStaff';
import EditStaff from './add-edit/EditStaff';
import Main from './pages/mainpage';
import Missions from './pages/mission';
import AddMissions from './add-edit/AddMission';
import EditMission from './add-edit/EditMission';
import Gallery from './pages/gallery';
import AddGallery from './add-edit/AddGallery';
import EditGallery from './add-edit/EditGallery';
import Act from './pages/act';
import AddActivity from './add-edit/AddActivity';
import EditActivity from './add-edit/EditActivity';
import About from './pages/about';
import Location from './pages/location';
import Setting from './pages/setting';
import { Row, Col, Form, Input, Button } from 'antd';
import { signInWithEmailAndPasswordCustom } from './firebase';

function App() {
  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/coop" element={<Coop />} />
          <Route path="/coops/add" element={<AddCoop />} />
          <Route path="/coops/edit/:id" element={<EditCoop />} /> 
          <Route path="/staff" element={<Staff />} />
          <Route path="/staffs/add" element={<AddStaff />} />
          <Route path="/staffs/edit/:id" element={<EditStaff />} />
          <Route path="/main" element={<Main />} />
          <Route path='/missions' element={<Missions />} />
          <Route path="/missions/add" element={<AddMissions />} />
          <Route path="/missions/edit/:id" element={<EditMission />} />
          <Route path='/gallery' element={<Gallery />} />
          <Route path="/gallery/add" element={<AddGallery />} />
          <Route path="/gallery/edit/:id" element={<EditGallery />} />
          <Route path='/activities' element={<Act />} />
          <Route path="/activities/add" element={<AddActivity />} />
          <Route path="/activities/edit/:id" element={<EditActivity />} />
          <Route path='/about' element={<About />} />
          <Route path='/location' element={<Location />} />
          <Route path='/settings' element={<Setting />} />
        </Routes>
      </div>
    </Router>
  );
}

function Home() {
  const navigate = useNavigate();

  const onFinishSignIn = async (values) => {
    console.log('Received values:', values);
    const trimmedEmail = values.username.trim();
    try {
      await signInWithEmailAndPasswordCustom(trimmedEmail, values.password);
      navigate('/main');
    } catch (error) {
      console.error('Sign In Error:', error);
      alert('เข้าสู่ระบบไม่สำเร็จ โปรดลองอีกครั้ง');
    }
  };

  return (
    <div className='appContent'>
      <Row className='appRow'>
        <Col lg={12}>
          <img className='logInBanner' src="./images/image51.png" alt="Login Banner" />
        </Col>
        <Col lg={12} className='logInCol'>
          <h2 className='logInHead'>เข้าสู่ระบบ</h2>
          <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinishSignIn}
          >
            <Form.Item
              label="ชื่อผู้ใช้งาน"
              name="username"
              className='logInForm'
              rules={[{ required: true, message: 'Please input your username!' }]}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="รหัสผ่าน"
              name="password"
              className='logInForm'
              rules={[{ required: true, message: 'Please input your password!' }]}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Input.Password className='passwordForm' />
            </Form.Item>
            <div className='logInUnderLine'></div>
            <Form.Item>
              <Button type="primary" htmlType="submit" className='logInButton'>
                เข้าสู่ระบบ
              </Button>
            </Form.Item>
          </Form>
          <div>หรือ</div>
        </Col>
      </Row>
    </div>
  );
}

export default App;
