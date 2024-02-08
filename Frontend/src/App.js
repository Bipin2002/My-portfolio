

import React from 'react';
import SignUp from './main_screens/SignUp';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './main_screens/Login';
import Portfolio from './main_screens/Portfolio';
import Dashboard from './main_screens/Dashboard';




function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Portfolio />}></Route>
          <Route path="/Admin" Component={Login} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/Dashboard" Component={Dashboard} />
        </Routes>
      </Router>
    </div>

  );
}

export default App;
