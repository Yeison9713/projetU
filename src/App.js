import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./Pages/Login";
import Logout from './Pages/Logout';
import SignUp from './Pages/SignUp';
import Dashboard from "./Pages/Dashboard";
import Profile from './Pages/Profile';
import Mascotas from './Pages/Mascotas';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="logout" element={<Logout />} />
          <Route path="signup" element={<SignUp />} />
          <Route path='/' element={<Dashboard />} >
            <Route path='profile' element={<Profile />}></Route>
            <Route path='mascotas' element={<Mascotas />}></Route>
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
