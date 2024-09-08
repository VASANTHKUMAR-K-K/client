import './App.css';
// import Navbar from './components/Navbar';
import Register from './components/Register'
import Signin from './components/Signin'
import CreateStudent from './studentComponent/CreateStudent';
import Student from './studentComponent/Student'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UpdateStudent from './studentComponent/UpdateStudent';
import Home from './components/Home'


function App() {
  return (
    <div className="App">
      <div className='container-fluid sub'>
        
        <Router>
          <Routes>
            <Route path='/home' element={<Home />} />
            <Route path='/signin' element={<Signin />} />
            <Route path='/signup' element={<Register />} />
            <Route path='/student' element={<Student />} />
            <Route path='/createstudent' element={<CreateStudent />} />
            <Route path='/updatestudent/:id' element={<UpdateStudent />} />
          </Routes>
        </Router>

      </div>
     
    </div>
  );
}

export default App;

