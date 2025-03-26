import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Connections from '../pages/Connections';
import Contacts from '../pages/Contacts';
import SendMessage from '../pages/SendMessage';
import ManageMessages from '../pages/ManageMessages';
import PrivateRoute from '../components/PrivateRoute';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/connections"
          element={
            <PrivateRoute>
              <Connections />
            </PrivateRoute>
          }
        />
        <Route
          path="/contacts"
          element={
            <PrivateRoute>
              <Contacts />
            </PrivateRoute>
          }
        />
        <Route
          path="/send-message"
          element={
            <PrivateRoute>
              <SendMessage />
            </PrivateRoute>
          }
        />
        <Route
          path="/manage-messages"
          element={
            <PrivateRoute>
              <ManageMessages />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;