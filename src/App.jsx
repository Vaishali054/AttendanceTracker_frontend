import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/SignUp' element={<Signup/>}/>
        <Route path="/admindashboard" element={<AdminDashboard/>}/>
      </Routes>
    </div>
  );
}

export default App;
