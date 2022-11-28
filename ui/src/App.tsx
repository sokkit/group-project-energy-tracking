import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Sidebar from './components/reusable/sidebar/Sidebar';
import Topbar from './components/reusable/topbar/Topbar';
import Dashboard from './components/pages/Dashboard';
import Reports from './components/pages/Reports';
import BillValidation from './components/pages/BillValidation';
import CostForecast from './components/pages/CostForecast';
import UploadPage from './components/pages/upload/UploadPage';

const App: React.FunctionComponent = () => {
  
  //Defines the paths of each page
  //This file should only have the topbar and sidebar
  return (
    <>
      <div className="App">
         <Topbar />
      </div>

      <Router>
        <Sidebar />
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/reports' element={<Reports />} />            
          <Route path='/billvalidation' element={<BillValidation />} />    
          <Route path='/costforecast' element={<CostForecast />} />

          {/* admin routes */}
          <Route path='/admin/upload' element={<UploadPage />} />
        </Routes>
      </Router> 
    </>
  );
}

export default App;
