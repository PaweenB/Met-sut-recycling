import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import MainLayout from './MainLayout';

const App = () => {
  const [locations, setLocations] = useState([]);

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

  return (
    <Router>
      <MainLayout locations={locations}>
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
      </MainLayout>
    </Router>
  );
};

export default App;
