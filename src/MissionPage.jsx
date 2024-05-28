import React from 'react';
import './MissionPage.css';
import './HomePage.css';

const MissionPage = () => {
  return (
    <div style={{margin:'-850px 0' , width:'100vw'}}>
      <div>
        <p  style={{margin: '950px 30px 0 ',color:'#1BB39B',fontSize:'32px' ,fontWeight:'bold' }}>
              ภารกิจของเรา
            <div style={{ borderBottom: '4px solid #1BB39B', width: '80px'}}></div>
        </p>
        <ul className='missionList'>
            <li><span style={{color:'black'}} >บริการวิชาการต่าง ๆ ให้กับภาคอุตสาหกรรม</span></li>
            <li><span style={{color:'black'}}>ที่ปรึกษาโครงการให้กับหน่วยงานภาครัฐและเอกชน</span></li>
            <li><span style={{color:'black'}}>ร่วมวิจัยเชิงประยุกต์กับภาคอุตสาหกรรมและหน่วยงานภาครัฐ</span></li>
            <li><span style={{color:'black'}}>อบรมความรู้ถ่ายทอดองค์ความรู้และนวัตกรรมทางด้านการผลิตและรีไซเคิลโลหะ</span></li>
            <li><span style={{color:'black'}}>การพัฒนาและถ่ายทอดเทคโนโลยีด้านการผลิตและรีไซเคิลโลหะให้กับกลุ่มอุตสาหกรรมที่มีศักยภาพ</span></li>
            <li><span style={{color:'black'}}>พัฒนาผลิตภัณฑ์ใหม่เข้าสู่ตลาดหรือพัฒนาเป็นแหล่งทรัพยากรทดแทนให้เกิดการหมุนเวียนอย่างมีประสิทธิภาพ</span></li>
            <li><span style={{color:'black'}}>สร้างเครือข่ายและสนับสนุนการพัฒนาเข้าสู่เมืองอุตสาหกรรมเชิงนิเวศน์และสังคมเศรษฐกิจหมุนเวียน</span></li>
        </ul>
      </div>
    </div>
  );
};

export default MissionPage;