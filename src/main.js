import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TrustPayForm from './Trustpayform.js';

const Main = () => {
  return (
    <Router>
      <Routes>
        <Route path="/transaction-type" element={<TrustPayForm activeTab="transaction-type" />} />
        <Route path="/product-details" element={<TrustPayForm activeTab="product-details" />} />
        <Route path="/your-details" element={<TrustPayForm activeTab="your-details" />} />
        <Route path="/share-link" element={<TrustPayForm activeTab="share-link" />} />
      
      </Routes>
    </Router>
  );
};

export default Main;
