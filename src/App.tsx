import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import CreateBlockchainComponent from './components/CreateBlockchainComponent';
import DisplayBlockchainComponent from './components/DisplayBlockchainComponent';
import AddressComponent from './components/AddressComponent';

import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/create-blockchain" />} />
        <Route path="/create-blockchain" element={<CreateBlockchainComponent />} />
        <Route path="/display-blockchain" element={<DisplayBlockchainComponent />} />
        <Route path="/address" element={<AddressComponent />} />
      </Routes>
    </Router>
  );
};

export default App;