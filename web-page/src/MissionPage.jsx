import React, { useState, useEffect } from 'react';
import { db } from './firebase'; 
import { collection, getDocs } from 'firebase/firestore'; 
import './MissionPage.css';
import './HomePage.css';

const MissionPage = () => {
  const [missionList, setMissionList] = useState([]);

  useEffect(() => {
    const fetchMissions = async () => {
      const missionRef = collection(db, 'missions'); 
      const snapshot = await getDocs(missionRef); 
      const missionsData = snapshot.docs.map(doc => ({
        ...doc.data(), 
        id: doc.id
      })); 
      missionsData.sort((a, b) => a.order - b.order);
      setMissionList(missionsData); 
    };

    fetchMissions();
  }, []);

  return (
    <div style={{ margin: '0', padding: '20px', width: '100vw' }}>
      <div>
        <div style={{ margin: '60px 30px', color: '#1BB39B', fontSize: '32px', fontWeight: 'bold' }}>
          ภารกิจของเรา
          <div style={{ borderBottom: '4px solid #1BB39B', width: '80px', marginTop: '10px' }}></div>
        </div>
        <ul className='missionList'>
          {missionList.map((mission, index) => (
            <li key={index}>
              <span style={{ color: 'black' }}>{mission.title}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MissionPage;
