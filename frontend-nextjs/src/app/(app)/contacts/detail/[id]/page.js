'use client'
import React from 'react'
import Link from 'next/link';
import { useSelector } from 'react-redux';
import GoBack from '@/components/GoBack';

const page = ({ params }) => {
  const contactsRedux = useSelector((state) => state.contacts.contacts);
  const contacts = contactsRedux.filter(i => i.id === parseInt(params.id));
  const contact = contacts.reduce((acc, cur, i) => (acc = cur), {});


  return (
    <div>

      <div className='h-screen bg-secondary'>
        <div className='bg-pink h-16 flex justify-between'>
          <GoBack />

          <Link
            href={`/contacts/edit/${contact.id}`}


            className="bg-primary hover:bg-blue-700 text-white font-bold py-2  px-12 rounded-full m-3 "
          >
            Edit</Link>


        </div>


        <div className='flex items-center justify-center pt-5'>
          <div className=' w-3/4 h-40 flex flex-col items-center justify-center pt-48  bg-gray-200  h-50 rounded-lg relative'>

            <img className="shadow rounded-full w-24 h-24 border-solid border-2 border-black  " src={contact.profilePic} alt="..." />
            <h2 className='text-xl font-bold'>{contact.name}</h2>
            <h2 className='text-gray-400'>{contact.title}</h2>

          </div>


        </div>

        <div className='flex items-start justify-start md:justify-center pt-24 px-20  '>

          <form className='flex flex-row flex-wrap items-start justify-start  '>

            <div className=' w-full flex flex-col  items-start justify-start '>
              <div>
                <h5 className='font-medium text-lg'>Name</h5>
                <h3 className=''>{contact.name}</h3>

              </div>

              <div>
                <h5 className='font-medium text-lg'>Title</h5>
                <h3 className=''>{contact.title}</h3>
              </div>

            </div>


            <div className=' w-full flex flex-col  items-start justify-start  '>
              {contact.address &&
                <div>
                  <h5 className='font-medium text-lg'>Address</h5>
                  <h3 className='text-gray'>{contact.address}</h3>
                </div>
              }



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