import React, { useState } from 'react';
import { getAuth, reauthenticateWithCredential, EmailAuthProvider, updatePassword } from 'firebase/auth';
import { message } from 'antd'; // สำหรับแสดงข้อความแจ้งเตือน
import Sidebar from '../components/NavigationMenu';
import './styles/location.css';

const Setting = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      message.error('รหัสผ่านใหม่ไม่ตรงกัน');
      return;
    }

    const auth = getAuth();
    const user = auth.currentUser;
    const credential = EmailAuthProvider.credential(user.email, oldPassword);

    try {
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);
      message.success('เปลี่ยนรหัสผ่านสำเร็จ');
    } catch (error) {
      message.error('ไม่สามารถเปลี่ยนรหัสผ่าน: ' + error.message);
    }
  };

  return (
    <div className='locContainer'>
      <Sidebar />
      <div className='locContent'>
        <p className="mainHead">จัดการข้อมูลที่อยู่</p>
        <div className="mainUnderLine"></div>
        <form onSubmit={handlePasswordChange}>
          <div className='formGroup'>
            <label htmlFor="oldPassword" className='locInputHead'>รหัสผ่านเดิม</label>
            <input type="password" id="oldPassword" name="oldPassword" className='locInput' value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
          </div>
          <div className='formGroup'>
            <label htmlFor="newPassword" className='locInputHead'>รหัสผ่านใหม่</label>
            <input type="password" id="newPassword" name="newPassword" className='locInput' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
          </div>
          <div className='formGroup'>
            <label htmlFor="confirmPassword" className='locInputHead'>รหัสผ่านใหม่อีกครั้ง</label>
            <input type="password" id="confirmPassword" name="confirmPassword" className='locInput' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          </div>
          <div className='formGroup'>
            <button type="submit" className='btn btn-primary'>เปลี่ยนรหัสผ่าน</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Setting;
