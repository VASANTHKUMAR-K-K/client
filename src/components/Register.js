import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export default function Register() {
  const navigate = useNavigate();

  // Define validation schema using Yup
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, 'Name must be at least 2 characters')
      .max(50, 'Name must be less than 50 characters')
      .required('Required'),
    contact: Yup.string()
      .matches(/^[0-9]+$/, 'Contact must be a number')
      .min(10, 'Contact must be exactly 10 digits')
      .max(10, 'Contact must be exactly 10 digits')
      .required('Required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Required'),
    password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[a-zA-Z]/, 'Password must contain letters')
    .matches(/\d/, 'Password must contain numbers')
    .matches(/^[a-zA-Z0-9]*$/, 'Password can only contain letters and numbers')
    .required('Password is required'),
  });

  // Handle form submission
  const handleSubmit = (values) => {
    axios.post("http://localhost:8000/api/user/register", values)
      .then(res => {
        if (res.data.message === "Register Successfully") {
          alert("Register successfully");
          navigate('/signin');
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <>
      <Navbar />
      <div className="d-flex justify-content-center align-items-center vh-90 mt-5 bg-dark p-5">
        <div className="bg-white p-3 rounded w-25">
          <h2>Register</h2>
          <Formik
            initialValues={{ name: '', contact: '', email: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <div className="mb-3">
                <label htmlFor="name"><strong>Name</strong></label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter Name"
                  autoComplete="off"
                  className="form-control rounded-0"
                />
                <ErrorMessage name="name" component="div" className="text-danger" />
              </div>
              <div className="mb-3">
                <label htmlFor="contact"><strong>Contact</strong></label>
                <Field
                  type="text"
                  id="contact"
                  name="contact"
                  placeholder="Enter Contact Number"
                  autoComplete="off"
                  className="form-control rounded-0"
                />
                <ErrorMessage name="contact" component="div" className="text-danger" />
              </div>
              <div className="mb-3">
                <label htmlFor="email"><strong>Email</strong></label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter Email"
                  autoComplete="off"
                  className="form-control rounded-0"
                />
                <ErrorMessage name="email" component="div" className="text-danger" />
              </div>
              <div className="mb-3">
                <label htmlFor="password"><strong>Password</strong></label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter Password"
                  className="form-control rounded-0"
                />
                <ErrorMessage name="password" component="div" className="text-danger" />
              </div>
              <button type="submit" className="btn btn-success w-100 rounded-0">
                Register
              </button>
            </Form>
          </Formik>
          <p>Already Have an Account</p>
          <Link to="/signin" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
            Login
          </Link>
        </div>
      </div>
    </>
  );
}
