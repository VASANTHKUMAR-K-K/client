import React from 'react'
import {Link} from 'react-router-dom'
export default function Home() {
  return (
    <div>
    <div >
            <nav className="navbar navbar-light bg-info d-flex mb-5" style={{width: '100%,'}}>
            <div className="container-fluid w-100 p-0">
            <span className="navbar-brand mb-0 h1 p-1 ">Student Details</span>
            <div style={{padding: '5px'}}>
             <button className="btn btn-info" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" 
             aria-controls="offcanvasRight">Toggle right offcanvas</button>
             <div className="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
            <div className="offcanvas-header">
             <h5 className="offcanvas-title" id="offcanvasRightLabel">Offcanvas right</h5>
             <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
              <div className="offcanvas-body d-flex" style={{flexDirection:"column", }} >
                <Link to='/student' className='btn bg-primary text-white rounded-5 ' style={{height:"40px", marginBottom:"10px"}}>Student Data </Link>
                <Link to='/createstudent' className='btn bg-primary text-white rounded-5 '  style={{height:"40px"}}>Departments </Link>
            </div>
            </div>
            </div>
            </div>
            </nav>
    </div>
    <h1>Home page</h1>
</div>
  )
}


