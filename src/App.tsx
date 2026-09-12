import { Routes, Route } from 'react-router-dom';
import Navbar from './components/common/navbar/navbar';
import HomePage from './pages/public/HomePage';
import VehicleDetailPage from './pages/public/VehicleDetailPage';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/vehiculo/:id" element={<VehicleDetailPage />} />
      </Routes>
    </div>
  );
}

export default App;