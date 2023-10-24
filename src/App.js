import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './AuthPages/Register';
import { AuthVerify } from './Auth/Authtext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './component/Common/Navbar';
import LoginPage from './AuthPages/LoginPage';
import Logout from './AuthPages/Logout';
import BlogPage from './pages/BlogPage';
import BlogDetails from './pages/BlogDetails';
import CategoryDetails from './pages/CategoryDetails';
import Profile from './pages/Profile';
import Routing from './pages/Routing';

function App() {
  return (
    <>
      <ToastContainer />
      <AuthVerify>
        <Router>
          {/* <Navbar/>
          <Routes>
            <Route path='/home' element={<Home />} />
            <Route path='/register' element={<Register />} />
            <Route path='/blog' element={<BlogPage/>} />
            <Route path='/blogdetails/:_id' element={<BlogDetails/>} />
            <Route path='/catdetails/:_id' element={<CategoryDetails/>} />
            <Route path='/profile' element={<Profile/>} />
            <Route path='/' element={<LoginPage/>} /> 
          </Routes> */}
          <Routing/>
        </Router>
      </AuthVerify>
    </>
  );
}

export default App;
