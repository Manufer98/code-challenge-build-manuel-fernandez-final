'use client'
import React from 'react'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { InitalContacts } from '../redux/slices/contactsSlice'
import { useDispatch, useSelector } from 'react-redux'
const page = () => {
  const [contactsAp, setContactsAp] = useState([])
  const [loading, setLoading] = useState(true);
  const [noData, setNodata] = useState(false);
  const [onError, setOnError] = useState(false);
  const dispatch = useDispatch();
  const contactsRedux = useSelector((state) => state.contacts);
  useEffect(() => {
    getData();
  }, [])


  const getData = async () => {
    const contactsApi = await fetch('http://127.0.0.1:8000/api/contacts/acf0339c-d81f-11ee-ac18-e88088f6de04')
      .then(res => res.json())
      .then(data => {
        dispatch(InitalContacts(data));
        setContactsAp(data);
        setLoading(false);
        if (data.length === 0) {
          setNodata(true);
        }
      }).catch(data => {
        setOnError(true);
        setLoading(false);

      });
  }

  return (

    <div className='h-screen bg-secondary'>
      <form className=" p-10">
        <div className='flex justify-between items-center '>
          <h1 className='text-2xl font-bold '>Contacts</h1>
          <Link className="bg-primary hover:bg-blue-700 text-white font-bold py-2  px-12 rounded-full m-3" href='contacts/add'>Add contact</Link>
        </div>
        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
          </div>
          <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
          <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-primary hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
        </div>
      </form>
      {loading &&
        <div role="status" className='flex items-center justify-center pt-10'>
          <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
          </svg>
          <span class="sr-only">Loading...</span>
        </div>}

      <div className='grid  grid-cols-3 items-center place-items-center   gap-5'>
        {contactsAp.map(i =>

          <div key={i.id} className='w-60 h-20 flex p-5 items-start bg-white border border-gray-200 rounded-lg shadow z-auto '>
            <img src="https://www.creative-tim.com/learning-lab/tailwind-starter-kit/img/team-2-800x800.jpg" alt="..." class="shadow rounded-full w-10 h-10 align-middle border-none" />
            <div className='pl-2'>
              <h2 className='text-lg font-bold '>{i.name}</h2>
              <h4 className='text-gray-400'>Title</h4>

            </div>
            <Link href={`contacts/edit/${i.id}`}  className='relative'>
              <svg xmlns="http://www.w3.org/2000/svg" className='w-5 h-5 fill-none stroke-gray-400 stroke-2 pl-1 z-0 ' strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>

            </Link>
          </div>


        )}
      </div>
      {onError && <div className='flex items-center justify-center'>
        <h2 className='text-lg font-bold'>Error connecting to the database</h2>

      </div>

      }

      {noData &&
        <div className='flex w-full h-full flex-col items-center justify-center  '>
          <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
          </svg>
          <h1 className='text-xl font-bold mb-5 ' >Add contacts to your database</h1>
          <Link
            href="/contacts/add"
            className="bg-primary hover:bg-blue-700 text-white font-bold py-2  px-12 rounded-full m-3"
          >
            Add new contacs</Link>
        </div>
      }
    </div>
  )
}

export default page