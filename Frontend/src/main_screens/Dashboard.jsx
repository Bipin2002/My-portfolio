import React, { useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode'; // Updated import statement
import "../style/Dashboard.css";

import ManageProjects from '../Dashboards_pages/ManageProjects';
import ManageBlogs from '../Dashboards_pages/ManageBlogs';
import Manageworks from '../Dashboards_pages/Manageworks';
import ManageAchievements from '../Dashboards_pages/ManageAchievements';
import ManageProfile from '../Dashboards_pages/ManageProfile';

function Dashboard() {
  const [activeSection, setActiveSection] = useState(() => {
    const storedSection = localStorage.getItem('activeSection');
    return storedSection ? storedSection : 'profile'; 
  });

  const [userId, setUserId] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      setUserId(decoded.userId);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('activeSection', activeSection);
  }, [activeSection]);

  const handleMenuClick = (section) => {
    setActiveSection(section);
  };

  return (
    <div className='main'>
      <div className="menu">
        <div> 
          <h1>Portfolio Management </h1>
        </div>
        <ul>
          <li><button onClick={() => handleMenuClick('profile')}>Profile</button></li>
          <li><button onClick={() => handleMenuClick('projects')}>Projects</button></li>
          <li><button onClick={() => handleMenuClick('blogs')}>blogs</button></li>
          <li><button onClick={() => handleMenuClick('volunteers')}>Works</button></li>
          <li><button onClick={() => handleMenuClick('achievements')}>Achievements</button></li>
          <li><button><a href='/Portfolio'>View portfolio</a></button></li>
        </ul>
      </div>

      <div className="body">
        {activeSection === 'profile' && (
          <ManageProfile userId={userId} />
        )}
        {activeSection === 'projects' && (
          <ManageProjects userId={userId} />
        )}
        {activeSection === 'blogs' && (
          <ManageBlogs userId={userId} />
        )}
        {activeSection === 'volunteers' && (
          <Manageworks userId={userId} />
        )}
        {activeSection === 'achievements' && (
          <ManageAchievements userId={userId} />
        )}
      </div>
    </div>
  );
}

export default Dashboard;
