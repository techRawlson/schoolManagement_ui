import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/protectedRoutes';
import Register from './Pages/Register/register';
import Login from './Pages/Register/login';
import Dashboard from './Pages/Dashboard';
import Student from './Pages/Student/Student';
import StudentDetails from './Pages/Student/StudentDetails'
import Staff from './Pages/Staff/Staff';
import StaffDetails from './Pages/Staff/StaffDetails';
//for authentication
import { AuthProvider } from './Pages/Auth/AuthContext';
import { useState } from 'react';
import Subject from './Pages/Subjetcs/Subjects';
import TimeTable from './Pages/TimeTable/TimeTable';
import Classtimetable from './Pages/TimeTable/ClassTimeTable';
import Stafftimetable from './Pages/TimeTable/StaffTimeTable';
import Periods from './Pages/TimeTable/Periods';
import Attendance from './Pages/Attendance/Attendances';
import AttendanceMarking from './Pages/Attendance/Attendancemarking';
import Attendancerecord from './Pages/Attendance/Attendancerecord';
import ClassRecord from './Pages/Attendance/ClassRecord';
import StudentRecord from './Pages/Attendance/Studentrecord';
import Main from './Pages/LMS/MainPage';
import LeaveDefinition from './Pages/LMS/LeaveDefintion';
import LmsLeaveallotment from './Pages/LMS/LeaveAllotment';
// import StaffLogin from './Pages/Register/StaffLogin';



function App() {
  const token = localStorage.getItem('token');
  const [tok, setToken] = useState(token)
  const [user, setUser] = useState([])
  console.log(user)




  return (
    <Router>
      <AuthProvider> {/* Wrap your routes with AuthProvider */}
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/login" element={<Login setToken={setToken} setUser={setUser} />} />
          <Route exact path='/dashboard' element={tok ? <Dashboard /> : <Login setToken={setToken} />} />
          <Route exact path='/staff' element={tok ? <Staff /> : <Login setToken={setToken} />} />
          <Route exact path='/timetable' element={tok ? <TimeTable /> : <Login setToken={setToken} />} />
          <Route exact path='/classtimetable' element={tok ? <Classtimetable /> : <Login setToken={setToken} />} />
          <Route exact path='/stafftimetable' element={tok ? <Stafftimetable /> : <Login setToken={setToken} />} />
          <Route exact path='/subjects' element={tok ? <Subject /> : <Login setToken={setToken} />} />
          <Route exact path='/student' element={tok ? <Student /> : <Login setToken={setToken} />} />
          <Route path='/studentdetails/:id' element={tok ? <StudentDetails /> : <Login setToken={setToken} />} />
          <Route path='/staffdetails/:id' element={tok ? <StaffDetails /> : <Login setToken={setToken} />} />
          <Route path='/periods' element={tok ? <Periods /> : <Login setToken={setToken} />} />
          <Route path='/attendance' element={tok ? <Attendance /> : <Login setToken={setToken} />} />
          <Route path='/attedancemarking' element={tok ? <AttendanceMarking user={user}/> : <Login setToken={setToken} />} />
          <Route path='/attendancerecord' element={tok ? <Attendancerecord /> : <Login setToken={setToken} />} />
          <Route path='/classrecord' element={tok ? <ClassRecord /> : <Login setToken={setToken} />} />
          <Route path='/studentrecord' element={tok ? <StudentRecord /> : <Login setToken={setToken} />} />
          <Route path='/lms' element={tok ? <Main /> : <Login setToken={setToken} />} />
          <Route path='/lmsdefinition' element={tok ? <LeaveDefinition /> : <Login setToken={setToken} />} />
          <Route path='/lmsleaveallotment' element={tok ? <LmsLeaveallotment /> : <Login setToken={setToken} />} />

        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
