import axios from 'axios';
import {useEffect, useState} from 'react'
import { useNavigate,useParams } from 'react-router-dom';



export default function UpdateStudent() {
  

    const navigate=useNavigate()

    const {id} = useParams()
    const [values,setValues]=useState({
        name:"",
        contact:"",
        state:"",
        email:"",
        education:"",
        gender:"",
    })

    useEffect(()=>{
        axios.put('http://localhost:8000/api/stu/edit/'+id)
        .then(res=>
            //   console.log(res)
              setValues(res.data.user)
    )
        .catch(err=>console.log(err))
    },[id])


    async function handleSubmit(e){
        e.preventDefault();
       await axios.put(`http://localhost:8000/api/stu/edit/${id}`, values)
       .then(res=>{
        if(res.data.message === "Update Successfully"){
            navigate('/student')
        }
       })
    .catch(err=>console.log(err))
    }
function handlecancle(){
    navigate('/student')
}

  return (
    <div className='d-flex vh-100 bg-light justify-content-center align-items-center '>
    <div className='w-50 bg-white rounded p-3 shadow-lg mb-5 mt-3'>
        <form onSubmit={e=>handleSubmit(e)}>
        {/* <form> */}
            <h3>UPDATE STUDENT</h3>
            <div className='d-flex justify-content-evenly'>
            <div className='mb-2 w-50 m-1'>
                <label>Name:</label>
                <input type='text' placeholder='Enter Name' className='form-control' name='name' value={values.name}
                onChange={e => setValues({...values,name:e.target.value})} required />
            </div>
            <div className='mb-2 w-50 m-1'>
                <label>Contact:</label>
                <input type='text' placeholder='Enter Contact' className='form-control'
                 name='contact'value={values.contact} onChange={e => setValues({...values,contact:e.target.value})} required/>
            </div>
            </div>
            <div className='mb-2 w-50'>
                <label >State:</label>
                <input type='text' placeholder='Location' className='form-control'value={values.state} 
                onChange={e => setValues({...values,state:e.target.value})}required/>
            </div>
            <div className='mb-2 w-50 '>
                <label>Email:</label>
                <input type='email' placeholder='abc123@gmail.com' className='form-control' value={values.email} 
                onChange={e => setValues({...values,email:e.target.value})}required/>
            </div>
            <div className='mb-2 w-50'>
                <label ><b>Gender :    </b></label>
                <input  className="form-check-input" type='radio' name='gender' value='male' />    
                <label >Male</label>
                <input className="form-check-input" type='radio' name='gender'value='female' />
                <label >Female:</label>
            </div>
            <div className='mb-2 w-50'>
                <label >Education:</label>
                <input type='text' placeholder='MCA, B.E, B.Sc., etc..,' className='form-control'value={values.education}
                 onChange={e => setValues({...values,education:e.target.value})} required/>
            </div>
            <button className='btn bg-primary text-white rounded-5 w-25 m-2'> Submit</button>
          
            <button type="button" className="btn bg-danger text-white rounded-5 w-25 m-2"
              onClick={handlecancle}>Close</button>
        </form>
    </div>
    
</div>
  )
}
