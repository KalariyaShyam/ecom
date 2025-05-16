import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import LoginPage from './components/pages/LoginPage';
import HomePage from './components/pages/HomePage';
import CartPage from './components/pages/CartPage';
import AdminDashboardPage from './components/admin/AdminDashboardPage';
import UserActionPage from './components/admin/UserActionPage';
import Logout from './components/pages/Logout';
import { useEffect } from 'react';
import Product from './components/pages/Product';

function App() {
  const loginStatus = localStorage.getItem("loginStatus");
  const navigater = useNavigate();

  return (
    <>

      <Routes>
        <Route path="/" element={<HomePage />} ></Route>
        <Route path="/home" element={<HomePage />} ></Route>
        <Route path="/cart" element={<CartPage />} ></Route>
        <Route path="/login" index element={<LoginPage />} ></Route>
        <Route path="/product/:id" element={<Product />} ></Route>
        {loginStatus && <>
          <Route path="/admin-dashboard" element={<AdminDashboardPage />} ></Route>
          <Route path="/add-user" element={<UserActionPage />} ></Route>
          <Route path="/edit-user/:id" element={<UserActionPage />} ></Route>
          <Route path="/logout" element={<Logout />} ></Route>

        </>
        }

      </Routes >
    </>
  );
}

export default App;
