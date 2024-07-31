import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import './App.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Login';
import Register from './pages/Register';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<PrivateRoute />}>
          <Route path='/' element={<Home/>}/>
        </Route>
        
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        
      </Routes> 
    <ToastContainer position="bottom-right" theme="dark" />
    </Router>
    </>
  )
}

export default App
