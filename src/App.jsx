import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/protectedRoutes';
import Register from './Pages/register';
import Login from './Pages/login';
import Dashboard from './Pages/Dashboard';

import Student from './Pages/Student/Student';
import StudentDetails from './Pages/Student/StudentDetails'
import Staff from './Pages/Staff/Staff';
import StaffDetails from './Pages/Staff/StaffDetails';
//for authentication
import { AuthProvider } from './Pages/Auth/AuthContext';
import { useState } from 'react';


function App() {
  const token=localStorage.getItem('token');
  const[tok,setToken]=useState(token)
 
  return (
    <Router>
      <AuthProvider> {/* Wrap your routes with AuthProvider */}
        <Routes>
          <Route exact path="/" element={<Register />} />
          <Route exact path="/login" element={<Login setToken={setToken}/>} />
          <Route exact path='/dashboard' element={tok?<Dashboard/>:<Login setToken={setToken}/>}/>
          <Route exact path='/staff' element={tok?<Staff/>:<Login setToken={setToken}/>}/>
          <Route exact path='/student' element={tok?<Student/>:<Login setToken={setToken}/>}/>
          <Route  path='/studentdetails/:id' element={tok?<StudentDetails/>:<Login setToken={setToken}/>}/>
          <Route  path='/staffdetails/:id' element={tok?<StaffDetails/>:<Login setToken={setToken}/>}/>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
