import { Routes, Route } from 'react-router-dom';
import Navbar from './components/common/navbar/navbar';
import HomePage from './pages/public/HomePage';
import VehicleDetailPage from './pages/public/VehicleDetailPage';
import AdminDashboard from './pages/admin/AdminDashboard/AdminDashboard';
import AdminVehiclesPage from './pages/admin/AdminVehiclesPage/AdminVehiclesPage';
import AdminStudiesPage from './pages/admin/AdminStudiesPage/AdminStudiesPage';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/vehiculo/:id" element={<VehicleDetailPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/vehiculos" element={<AdminVehiclesPage />} />
        <Route path="/admin/estudios" element={<AdminStudiesPage />} />
      </Routes>
    </div>
  );
}

export default App;