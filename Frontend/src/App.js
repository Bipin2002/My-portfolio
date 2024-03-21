

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Login from './main_screens/Login';
import Portfolio from './main_screens/Portfolio';
import Dashboard from './main_screens/Dashboard';
import SplashScreen from './main_screens/SplashScreen';
import SignUp from './main_screens/SignUp';





function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<SplashScreen />}></Route>
          <Route path="/Portfolio" element={<Portfolio />}></Route>
          <Route path="/Dashboard" element={<Dashboard/>}></Route>
          <Route path="/signup" element={<SignUp/>}></Route>
        </Routes>
      </Router>
    </div>

  );
}

export default App;
