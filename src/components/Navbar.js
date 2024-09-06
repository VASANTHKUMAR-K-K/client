

export default function Navbar() {
  return (
    <div>
        <div >
                <nav className="navbar navbar-light bg-info d-flex mb-5" style={{width: '100%,'}}>
                <div className="container-fluid w-100 p-0">
                <span className="navbar-brand mb-0 h1 p-1 ">Student Details</span>
                <div style={{padding: '5px'}}>
                    <a href='/signin' style={{textDecoration:'none', color:'black'}}>SingIn / </a>
                    <a href='/signup'style={{textDecoration:'none', color:'black'}}>SingUp</a>
                </div>
                </div>
                </nav>
        </div>
    </div>
  )
}
