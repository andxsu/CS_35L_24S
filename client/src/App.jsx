import './App.css';
import {Routes, Route} from 'react-router-dom';
import Navbar from '../src/components/Navbar';
import Home from '../src/pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import axios from 'axios';
import {Toaster} from 'react-hot-toast';
import {UserContextProvider} from '../context/userContext';
import Dashboard from './pages/Dashboard';
import CreateOrder from './pages/createOrder';
import DeliveryDashboard from './pages/DeliveryDashboard';
import AcceptOrder from './pages/AcceptOrder';
import CompleteOrder from './pages/CompleteOrder';


axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;

function App() {

  return (
    <UserContextProvider>
    <Navbar />
    <Toaster position = 'bottom-right' toastOptions={{duration: 2000}} />
    <Routes>
      <Route path='/' element = {<Home />} />
      <Route path='/register' element = {<Register />} />
      <Route path='/login' element = {<Login />} />
      <Route path = '/dashboard' element = {<Dashboard />} />
      <Route path = '/order' element = {<CreateOrder />} />
      <Route path = '/deliverydashboard' element = {<DeliveryDashboard/>} />
      <Route path = '/acceptorder/:orderId' element = {<AcceptOrder/>} />
      <Route path = '/completeorder/:orderId' element = {<CompleteOrder />} />
    
    </Routes>
    </UserContextProvider>
      

  )
}

export default App
