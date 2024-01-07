import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginRegisterPage from './pages/LoginRegisterPage';
import DashboardPage from './pages/DashboardPage';
import RoomPage from './pages/RoomPage';
import UsersPage from './pages/UsersPage';
import ReservationPage from './pages/ReservationPage';

function App() {
  return (
    <Router>
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/login" component={LoginRegisterPage} />
      <Route path="/dashboard" component={DashboardPage} />
      <Route path="/room" component={RoomPage} />
      <Route path="/users" component={UsersPage} />
      <Route path="/reservation" component={ReservationPage} />
    </Switch>
  </Router>
  );
}

export default App;
