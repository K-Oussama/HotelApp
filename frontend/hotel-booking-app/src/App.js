import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/Home/HomePage';
import LoginRegisterPage from './pages/Authentication/LoginRegisterPage';
import RoomPage from './pages/Room/RoomPage';
import RoomDetails from './pages/Room/RoomDetails';
import UsersPage from './pages/User/UsersPage';
import ReservationPage from './pages/Reservation/ReservationPage';
import TestPage from './pages/TestPage';
import DashboardPage from './pages/DashboardPage';

function App() {
  return (
    <Router>
    <Routes>
      <Route exact path="/" element={<HomePage />} />
      <Route exact path="/test" element={<TestPage />} />
      <Route path="/login" element={<LoginRegisterPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      {/*<Route path="/dashboard/*" element={<Dashboard />} />*/}
      <Route path="/room" element={<RoomPage />} />
      <Route path="/room/:id" component={RoomDetails} />
      <Route path="/users" element={<UsersPage />} />
      <Route path="/reservation" element={<ReservationPage />} />
    </Routes>
  </Router>
  );
}

export default App;
