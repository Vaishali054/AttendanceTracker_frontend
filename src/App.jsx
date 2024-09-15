import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Teacher from "./pages/Teacher/Teacher";
import Subject from "./pages/Subject/Subject";
import Dept from "./pages/Dept/Dept";
import Degree from "./pages/Degree/Degree";
import Sem from "./pages/Sem/Sem";
import TimeTable from "./pages/TimeTable/TimeTable";

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/SignUp' element={<Signup/>}/>
        <Route path="/admindashboard/teacher" element={<Teacher/>}/>
        <Route path="/admindashboard/subject" element={<Subject/>}/>
        <Route path="/admindashboard/department" element={<Dept/>}/>
        <Route path="/admindashboard/degree" element={<Degree/>}/>
        <Route path="/admindashboard/semester" element={<Sem/>}/>
        <Route path="/admindashboard/timetable" element={<TimeTable/>}/>
      </Routes>
    </div>
  );
}

export default App;
