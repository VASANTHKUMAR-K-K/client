import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import React, { useState } from 'react';

export default function CreateStudent() {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);

  // Initial values for the form
  const initialValues = {
    name: "",
    contact: "",
    state: "",
    email: "",
    education: "",
    gender: "",
  };

  // Validation schema using Yup
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, 'Name must be at least 3 characters')
      .max(15, 'Name must be at most 15 characters')
      .required('Required'),
    contact: Yup.string()
      .min(10, 'Contact must be at least 10 characters')
      .max(13, 'Contact must be at most 13 characters')
      .required('Required'),
    state: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email address').required('Required'),
    education: Yup.string().required('Required'),
    gender: Yup.string().required('Required'),
  });

  // Handle form submission
  const handleSubmit =  (values) => {
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('contact', values.contact);
    formData.append('state', values.state);
    formData.append('email', values.email);
    formData.append('education', values.education);
    formData.append('gender', values.gender);
    if (selectedFile) formData.append('image', selectedFile)

     axios.post("http://localhost:8000/api/stu/create", formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
      .then(res => {
         console.log(res)
        navigate('/student');
      })
      .catch(err => console.log(err,"ooooo"),
    );
  };

  return (
    <div className='d-flex vh-100 bg-light justify-content-center align-items-center'>
      <div className='w-50 bg-white rounded p-3 shadow-lg mb-5 mt-3'>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue }) => (
            <Form>
              <h3>ADD STUDENT</h3>
              <div className='d-flex justify-content-evenly'>
                <div className='mb-2 w-50 m-1'>
                  <label>Name:</label>
                  <Field type='text' placeholder='Enter Name' className='form-control' name='name' />
                  <ErrorMessage name='name' component='div' className='text-danger' />
                </div>
                <div className='mb-2 w-50 m-1'>
                  <label>Contact:</label>
                  <Field type='text' placeholder='Enter Contact' className='form-control' name='contact' />
                  <ErrorMessage name='contact' component='div' className='text-danger' />
                </div>
              </div>
              <div className='mb-2 w-50'>
                <label>State:</label>
                <Field type='text' placeholder='Location' className='form-control' name='state' />
                <ErrorMessage name='state' component='div' className='text-danger' />
              </div>
              <div className='mb-2 w-50'>
                <label>Email:</label>
                <Field type='email' placeholder='abc123@gmail.com' className='form-control' name='email' />
                <ErrorMessage name='email' component='div' className='text-danger' />
              </div>
              <div className='mb-2 w-50'>
                <label><b>Gender : </b></label>
                <Field type='radio' name='gender' value='male' onChange={() => setFieldValue('gender', 'male')} />
                <label>Male</label>
                <Field type='radio' name='gender' value='female' onChange={() => setFieldValue('gender', 'female')} />
                <label>Female</label>
                <ErrorMessage name='gender' component='div' className='text-danger' />
              </div>
              <div className='mb-2 w-50'>
                <label>Education:</label>
                <Field type='text' placeholder='MCA, B.E, B.Sc., etc..,' className='form-control' name='education' />
                <ErrorMessage name='education' component='div' className='text-danger' />
              </div>
              <div className='mb-2 w-50'>
                <label>Image:</label>
                <input
                  type='file'
                  onChange={(event) => {
                    setSelectedFile(event.currentTarget.files[0]);
                  }}
                  className='form-control'
                />
              </div>
              <button type='submit' className='btn bg-primary text-white rounded-5 w-25 m-2'>Submit</button>
              <button type="button" className="btn bg-danger text-white rounded-5 w-25 m-2" onClick={() => navigate('/student')}>Close</button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';

// export default function CreateStudent() {
//   const navigate = useNavigate();

//   // Initial values for the form
//   const initialValues = {
//     name: "",
//     contact: "",
//     state: "",
//     email: "",
//     education: "",
//     gender: "",
//     image:""
//   };

//   // Validation schema using Yup
//   const validationSchema = Yup.object({
//     name: Yup.string()
//     .min(3, 'Username must be at least 3 characters')
//     .max(15, 'Username must be at most 15 characters')
//     .required('Required'),
//     contact: Yup.string()
//     .min(10, 'You must be at least 18 years old')
//     .max(13, 'Age must be less than 100')
//     .required('Required'),
//     state: Yup.string().required('Required'),
//     email: Yup.string().email('Invalid email address').required('Required'),
//     education: Yup.string().required('Required'),
//     gender: Yup.string().required('Required'),
//   });

//   // Handle form submission
//   const handleSubmit = (values) => {
//     axios.post("http://localhost:8000/api/stu/create", values)
//       .then(res => {
//         console.log(res);
//         navigate('/student');
//       })
//       .catch(err => console.log(err));
//   };

//   return (
//     <div className='d-flex vh-100 bg-light justify-content-center align-items-center'>
//       <div className='w-50 bg-white rounded p-3 shadow-lg mb-5 mt-3'>
//         <Formik
//           initialValues={initialValues}
//           validationSchema={validationSchema}
//           onSubmit={handleSubmit}
//         >
//           {({ setFieldValue }) => (
//             <Form>
//               <h3>ADD STUDENT</h3>
//               <div className='d-flex justify-content-evenly'>
//                 <div className='mb-2 w-50 m-1'>
//                   <label>Name:</label>
//                   <Field type='text' placeholder='Enter Name' className='form-control' name='name' />
//                   <ErrorMessage name='name' component='div' className='text-danger' />
//                 </div>
//                 <div className='mb-2 w-50 m-1'>
//                   <label>Contact:</label>
//                   <Field type='text' placeholder='Enter Contact' className='form-control' name='contact' />
//                   <ErrorMessage name='contact' component='div' className='text-danger' />
//                 </div>
//               </div>
//               <div className='mb-2 w-50'>
//                 <label>State:</label>
//                 <Field type='text' placeholder='Location' className='form-control' name='state' />
//                 <ErrorMessage name='state' component='div' className='text-danger' />
//               </div>
//               <div className='mb-2 w-50'>
//                 <label>Email:</label>
//                 <Field type='email' placeholder='abc123@gmail.com' className='form-control' name='email' />
//                 <ErrorMessage name='email' component='div' className='text-danger' />
//               </div>
//               <div className='mb-2 w-50'>
//                 <label><b>Gender : </b></label>
//                 <Field type='radio' name='gender' value='male' onChange={() => setFieldValue('gender', 'male')} />
//                 <label>Male</label>
//                 <Field type='radio' name='gender' value='female' onChange={() => setFieldValue('gender', 'female')} />
//                 <label>Female</label>
//                 <ErrorMessage name='gender' component='div' className='text-danger' />
//               </div>
//               <div className='mb-2 w-50'>
//                 <label>Education:</label>
//                 <Field type='text' placeholder='MCA, B.E, B.Sc., etc..,' className='form-control' name='education' />
//                 <ErrorMessage name='education' component='div' className='text-danger' />
//               </div>
//               <input type='file' />
//               <button type='submit' className='btn bg-primary text-white rounded-5 w-25 m-2'>Submit</button>
//               <button type="button" className="btn bg-danger text-white rounded-5 w-25 m-2" onClick={() => navigate('/student')}>Close</button>
//             </Form>
//           )}
//         </Formik>
//       </div>
//     </div>
//   );
// }