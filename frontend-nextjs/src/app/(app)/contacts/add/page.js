'use client'
import React, { useState } from 'react'
/* import axios from 'axios' */
import { useFormik } from 'formik';
import { addContactSchema } from '@/app/(auth)/schema/yup';
/* import ReactGoogleAutocomplete from 'react-google-autocomplete'; */
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/auth';
import axios from '@/lib/axios';

const page = () => {
  const [roundedPic, setRoundedPic] = useState('');
  const { push } = useRouter();
  const { user } = useAuth({ middleware: 'auth' })
  

  const onSubmit = async (values, actions) => {



    const contact = {
      user_id: user.id,
      name: values.name,
      title: values.title,
      profilePic: values.profilePic,
      address: values.address,
      phone: values.phone,
      email: values.email
    }
    
    axios.post('http://127.0.0.1:8000/api/contact/create',contact).then((response) => {
      console.log(response)
      push('/dashboard')
    });

    /* fetch('http://127.0.0.1:8000/api/contact/create', {

      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      mode: 'cors',
      body: JSON.stringify(contact)

    }).then((response) => {
      console.log(response)
      push('/dashboard')
    }); */


  };

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {

      name: "",
      title: "",
      profilePic: "",
      address: "",
      phone: "",
      email: "",
    },
    validationSchema: addContactSchema,
    onSubmit,
  });


  return (
    <div className='h-screen bg-secondary'>
      <div className='bg-pink h-16 flex'>
        <Link href='/dashboard' type="button" className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200    gap-x-2 sm:w-auto ">
          <svg className="w-5 h-5 rtl:rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
          </svg>
          <span>Back</span>
        </Link>


      </div>



      <div className='flex items-center justify-center pt-5'>
        <div className=' w-3/4 h-40 flex flex-col items-center justify-center pt-48  bg-gray-200 w-50 h-50 rounded-lg relative'>

          <img className="shadow rounded-full w-24 h-24 border-solid border-2 border-black" src="https://img.freepik.com/foto-gratis/resumen-superficie-texturas-muro-piedra-hormigon-blanco_74190-8189.jpg?w=1380&t=st=1709500774~exp=1709501374~hmac=e38ad90d11b1ebb02eb0b8ee5183b0cfc4908fb20f84db5a823eece14e67d307" alt="..." />
          <h2 className='text-xl font-bold'></h2>
          <h2 className='text-gray-400'></h2>
        </div>

      </div>


      <div className='flex  items-center justify-center pt-24'>

        <form onSubmit={handleSubmit} className='flex flex-row flex-wrap  border-dashed border-red-500'>
          <div className='sm:basis-2/4 w-full  flex flex-col items-center justify-center'>
            <div>
              <h5 className='font-medium'>Name</h5>
              <input
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                id="name"
                type="text"
                className={errors.name && touched.name ? " border-2  bg-gray-200 appearance-none  border-red-500 rounded  py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" : "w-full bg-gray-200 appearance-none border-2 border-gray-200 rounded  py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"}
              />
              {errors.name && touched.name && <p className='text-red-500'>{errors.name}</p>}
            </div>

            <div>
              <h5 className='font-medium'>Title</h5>
              <input
                value={values.title}
                onChange={handleChange}
                onBlur={handleBlur}
                id="title"
                type="text"
                className={errors.title && touched.title ? "w-50 border-2  bg-gray-200 appearance-none  border-red-500 rounded  py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" : "w-50 bg-gray-200 appearance-none border-2 border-gray-200 rounded  py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"}
              />
              {errors.title && touched.title && <p className='text-red-500'>{errors.title}</p>}
            </div>


            <div>
              <h5 className='font-medium'>Profile Picture</h5>
              <input
                value={values.profilePic}
                onChange={handleChange}
                onBlur={handleBlur}
                id="profilePic"
                type="file"

                className={errors.profilePic && touched.profilePic ? "w-50 border-2  bg-gray-200 appearance-none  border-red-500 rounded  py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" : "w-50 bg-gray-200 appearance-none border-2 border-gray-200 rounded  py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"}
              />
              {errors.profilePic && touched.profilePic && <p className='text-red-500'>{errors.profilePic}</p>}
            </div>
          </div>
          <div className='sm:basis-2/4 w-full flex flex-col items-center justify-center'>
            <div>
              <h5 className='font-medium'>Address</h5>
              {/* <ReactGoogleAutocomplete /> */}
              <input
                value={values.address}
                onChange={handleChange}
                onBlur={handleBlur}
                id="address"
                type="text"
                className={errors.address && touched.address ? "w-50 border-2  bg-gray-200 appearance-none  border-red-500 rounded  py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" : "w-50 bg-gray-200 appearance-none border-2 border-gray-200 rounded  py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"}
              />
              {errors.address && touched.address && <p className='text-red-500'>{errors.address}</p>}
            </div>


            <div>
              <h5 className='font-medium'>Phone</h5>
              <input
                value={values.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                id="phone"
                type="text"
                className={errors.phone && touched.phone ? "w-50 border-2  bg-gray-200 appearance-none  border-red-500 rounded  py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" : "w-50 bg-gray-200 appearance-none border-2 border-gray-200 rounded  py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"}
              />
              {errors.phone && touched.phone && <p className='text-red-500'>{errors.phone}</p>}
            </div>


            <div>
              <h5 className='font-medium'>Email</h5>
              <input
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                id="email"
                type="email"
                className={errors.email && touched.email ? "w-50 border-2  bg-gray-200 appearance-none  border-red-500 rounded  py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" : "w-50 bg-gray-200 appearance-none border-2 border-gray-200 rounded  py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"}
              />
              {errors.email && touched.email && <p className='text-red-500'>{errors.email}</p>}
            </div>
          </div>
          <div className=' w-full flex justify-center pt-5'>
            <button
              onSubmit={onSubmit}
              className="bg-primary hover:bg-blue-700 text-white font-bold py-2  px-12 rounded-full m-3"
            >
              Save</button>
            <Link
              href='/dashboard'
              className="bg-primary hover:bg-blue-700 text-white font-bold py-2  px-12 rounded-full m-3"
            >
              Cancel</Link>

          </div>
        </form>

      </div>
    </div>
  )
}

export default page