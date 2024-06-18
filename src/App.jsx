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
import { useEffect, useState } from 'react';
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
import LeaveApplication from './Pages/LMS/LeaveApplication';
import LeaveApproval from './Pages/LMS/LeaveApproval';
import LeaveBalances from './Pages/LMS/Balance';
import Loginpage from './Pages/Register/LoginPage';
// import StaffLogin from './Pages/Register/StaffLogin';


import { useData } from './Pages/context/DataContext';
import Role from './Pages/Role';
import Directory from './Pages/Directory/Directroy';
import Holiday from './Pages/Holidays/Holiday';
import Annoucement from './Pages/Annoucements/Annoucement';
function App() {
  const { data, updateData } = useData();
  const token = localStorage.getItem('token');
  const [tok, setToken] = useState(token)
  const [user, setUser] = useState([])
  console.log(user)
console.log(data)
console.log(localStorage.getItem("token"))
  const getStudent = async () => {
    const id = localStorage.getItem("username")
    console.log(id)
   
    try {
      const data = await fetch(`http://192.168.1.121:8081/api/Login/users/${id}`)
      const fdata = await data.json()
      console.log(fdata)

      await updateData(fdata.role)

    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getStudent()
  }, [])


  return (
    <Router>
      <AuthProvider> {/* Wrap your routes with AuthProvider */}
        <Routes>
          <Route exact path="/" element={tok ? <Dashboard /> : <Login setToken={setToken} />}/>
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
          <Route path='/lmsleaveapplication' element={tok ? <LeaveApplication /> : <Login setToken={setToken} />} />
          <Route path='/lmsleaveapproval' element={tok ? <LeaveApproval /> : <Login setToken={setToken} />} />
          <Route path='/lmsbalance' element={tok ? <LeaveBalances/> : <Login setToken={setToken} />} />
          <Route path='/loginpage' element={tok ? <Loginpage/> : <Login setToken={setToken} />} />
          <Route path='/role' element={tok ? <Role/> : <Login setToken={setToken} />} />
          <Route path='/directory' element={tok ? <Directory/> : <Login setToken={setToken} />} />
          <Route path='/holidays' element={tok ? <Holiday/> : <Login setToken={setToken} />} />
          <Route path='/annoucement' element={tok ? <Annoucement/> : <Login setToken={setToken} />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
