'use client'
import React from 'react'
import Link from 'next/link';
import { useSelector } from 'react-redux';

const page = ({ params }) => {
  const contactsRedux = useSelector((state) => state.contacts.contacts);
  const contacts = contactsRedux.filter(i => i.id === parseInt(params.id));
  const contact = contacts.reduce((acc, cur, i) => (acc = cur), {});
  


  console.log(contact);

  return (
    <div>

      <div className='h-screen bg-secondary'>
        <div className='bg-pink h-16 flex justify-between'>
          <Link href='/dashboard' type="button" className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200    gap-x-2 sm:w-auto ">
            <svg className="w-5 h-5 rtl:rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
            </svg>
            <span>Back</span>
          </Link>
          
          <Link
          href={`/contacts/edit/${contact.id}`}
           
            
            className="bg-primary hover:bg-blue-700 text-white font-bold py-2  px-12 rounded-full m-3 "
          >
            Edit</Link>


        </div>


        <div className='flex items-center justify-center pt-5'>
          <div className=' w-3/4 h-40 flex flex-col items-center justify-center pt-48  bg-gray-200 w-50 h-50 rounded-lg relative'>

            <img className="shadow rounded-full w-24 h-24 border-solid border-2 border-black  " src={contact.profilePic} alt="..." />
            <h2 className='text-xl font-bold'>{contact.name}</h2>
            <h2 className='text-gray-400'>{contact.title}</h2>
            
          </div>
          

        </div>

        <div className='flex items-start justify-start md:justify-center pt-24 px-20  '>

          <form  className='flex flex-row flex-wrap items-start justify-start  '>

            <div className='basis-2/4 w-full flex flex-col  items-start justify-start '>
              <div>
                <h5 className='font-medium text-lg'>Name</h5>
                <h3 className=''>{contact.name}</h3>
               
              </div>

              <div>
                <h5 className='font-medium text-lg'>Title</h5>
                <h3 className=''>{contact.title}</h3>
              </div>


              
            </div>

            <div className='basis-2/4 w-full flex flex-col  items-start justify-start  '>
              <div>
                <h5 className='font-medium text-lg'>Address</h5>
                {/* <ReactGoogleAutocomplete /> */}
                
                <h3 className='text-gray'>{contact.address}</h3>
              </div>


              <div>
                <h5 className='font-medium text-lg'>Phone</h5>
                <h3 className=''>{contact.phone}</h3>
               
              </div>


              <div>
                <h5 className='font-medium text-lg'>Email</h5>
                <h3 className=''>{contact.email}</h3>
              </div>
            </div>


            

          </form>
        </div>


      </div>

    </div>
  )
}

export default page