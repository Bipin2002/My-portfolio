import React, { useState } from 'react';
import "../style/Dashboard.css";

import ManageProjects from '../Dashboards_pages/ManageProjects';
import ManageBlogs from '../Dashboards_pages/ManageBlogs';
import Manageworks from '../Dashboards_pages/Manageworks';
import ManageAchievements from '../Dashboards_pages/ManageAchievements';


function Dashboard() {
  const [activeSection, setActiveSection] = useState('projects');

  const handleMenuClick = (section) => {
    setActiveSection(section);
  };

  // const handleLogout = () => {
  //   localStorage.removeItem('token');
  //   window.location.href = '/login';
  // };
  return (
    <div className='main'>
      <div className="menu">
        <h1>Portfolio Management</h1>

        <ul>
          <li><button onClick={() => handleMenuClick('projects')}>Projects</button></li>
          <li><button onClick={() => handleMenuClick('blogs')}>blogs</button></li>
          <li><button onClick={() => handleMenuClick('volunteers')}>Works</button></li>
          <li><button onClick={() => handleMenuClick('achievements')}>Achievements</button></li>
          {/* <button onClick={handleLogout}>Logout</button> */}
        </ul>
        
      </div>

      <div className="body">
        {activeSection === 'projects' && (
          <ManageProjects />
        )}


        {activeSection === 'blogs' && (
          <ManageBlogs />
        )}

        {activeSection === 'volunteers' && (
          <Manageworks />
        )}

        {activeSection === 'achievements' && (
          <ManageAchievements />
        )}
      </div>
    </div>
  );
}

export default Dashboard;
