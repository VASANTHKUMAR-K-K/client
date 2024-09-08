import {Link} from 'react-router-dom'
import {useState, useEffect} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Student() {   
  
  const [student, setStudent]=useState([]);
  const [refresh, setRefresh] = useState(false);

  const navigate=useNavigate()

  
  useEffect(() => {

    // toast.success('Operation was successful!');
    // toast.info("GeeksForGeeks", { autoClose: false });


    const fetchStudentData = async () => {
      const token = localStorage.getItem('authToken');
      console.log(token)
      
      if (token) {
        try {
          const response = await axios.get('http://localhost:8000/api/stu/getstudent', {
            headers: {
              'token': `${token}` 
            }
          })
          // console.log(response.data,)
          setStudent(response.data);
        } catch (error) {
          console.error('Error fetching student data:', error);
          alert("Login to access the student Datas")
        }
      } else {
        console.warn('No token found in localStorage');
      
      }
    };

    fetchStudentData();
  }, [refresh]);

    const handleDelete = async (id) => {
      const confirmed = window.confirm("Are you sure you want to delete this student data?");
      if (!confirmed) {
        return;
      }
      try {
        const response = await axios.delete(`http://localhost:8000/api/stu/delete/${id}`);
        
        if (response.data.message === "Deleted Successfully") {
          
          setRefresh(!refresh)
        } 
      } catch (error) {
        console.error("Error deleting student data:", error);
      }
    }

    function handleLogout(){
      localStorage.removeItem('authToken');
      toast.info("logout Successfully",{ 
        // position: toast.POSITION.TOP_CENTER,
        autoClose: 1000 
      });
      setTimeout(() => {
        navigate('/signin')
      }, 2000);
    }
    
  return (
    <div className='d-flex vh-90 bg-light justify-content-centern align-items-center mt-5'>
    <div className='w-100 bg-white rounded p-3 m-3 shadow mb-5 '>
      <span className='mb-4'><b><h4><i>STUDENT MANAGEMENT SYSTEM</i></h4></b></span>
        <Link to='/createstudent' className='btn bg-primary text-white rounded-5 float-end'>Add </Link>
        <button className='btn btn-info btn-sm float-start' onClick={handleLogout}>logout</button>
        <ToastContainer />
        {student.length !==0 ? 
      <table className='table'>
        <thead>
          <tr>
          <th>Name</th>
          <th>Image</th>
          <th>Contact</th>
          <th>EmailId</th>
          <th>State</th>
          <th>Gender</th>
          <th>Education</th>
          <th>Action</th>
          <th>DELETE</th>
          </tr>
        </thead>
        <tbody>
          {
            student &&
            student.map((data,i)=>(
              <tr key={i}>
                <td>{data.name}</td>
                {/* <td>{data.image}</td> */}
                <td><a style={{textDecoration:"none"}} href={`http://localhost:8000/${data.image}`} target="_blank"
                rel="noopener noreferrer">Image</a></td>
                <td>{data.contact}</td>
                <td>{data.email}</td>
                <td>{data.state}</td>
                <td>{data.gender}</td>
                <td>{data.education}</td>
                <td>
                  <Link to={`/updatestudent/${data._id}`} className='btn bg-warning'> Edit</Link>
                </td>
                <td>
                  <button onClick={e=>handleDelete(data._id)}className='btn bg-danger'> Delete</button>
                </td>
              </tr>
            )
          )
          
          }

        </tbody>

      </table>
          :<h2><i>NO STUDENTS RECORDS</i></h2>
        } 
    </div>
  </div>
  )
}
