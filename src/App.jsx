import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import Signin from "./pages/Signin/Signin";

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/SignUp' element={<Signin/>}/>
      </Routes>
    </div>
  );
}

export default App;
