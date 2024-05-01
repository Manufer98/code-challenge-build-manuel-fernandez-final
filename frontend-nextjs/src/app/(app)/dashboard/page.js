'use client'
import Header from '@/app/(app)/Header'
import React from 'react'
import Link from 'next/link'
import axios from '@/lib/axios';
import { useState, useEffect } from 'react'
import { GetContacts } from '@/app/redux/slices/contactsSlice'
import { useDispatch } from 'react-redux'
import { useAuth } from '@/hooks/auth'
import NoContacts from './NoContacts';
import SearchIcon from '@/components/icons/SearchIcon';
import LoadingIcon from '@/components/icons/LoadingIcon';
import ArrowIcon from '@/components/icons/ArrowIcon';


const Dashboard = () => {
    const [contactsAp, setContactsAp] = useState([])
    const [loading, setLoading] = useState(true);
    const [noData, setNodata] = useState(false);
    const [onError, setOnError] = useState(false);
    const dispatch = useDispatch();
    const { user } = useAuth({ middleware: 'auth' })

    useEffect(() => {
        getData();
    }, [])


    const getData = async () => {
        axios.get(`/api/contacts/${user?.id}`)
            .then(response => {
                const { data } = response;
                dispatch(GetContacts(data));
                setContactsAp(data);
                setLoading(false);
                if (data.length === 0) {
                    setNodata(true);
                }
            }).catch(res => {
                setOnError(true);
                setLoading(false);
               

            });
    }
    return (
        < div className='bg-secondary '>
            <Header title="Contacts App" />

            <div className='h-screen bg-secondary'>
                <form className=" p-10">
                    <div className='flex justify-between items-center '>
                        <h1 className='text-2xl font-bold '>Contacts</h1>
                        <Link className="bg-primary hover:bg-blue-700 text-white font-bold py-2  px-12 rounded-full m-3" href='contacts/add'>Add contact</Link>
                    </div>
                    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <SearchIcon />
                        </div>
                        <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                        <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-primary hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                    </div>
                </form>
                {loading &&
                    <div role="status" className='flex items-center justify-center pt-10'>
                        <LoadingIcon />
                        <span class="sr-only">Loading...</span>
                    </div>}

                <div className='grid  2xl:grid-cols-4 place-items-center sm:place-items-start   xl:grid-cols-3 sm:grid-cols-2 items-center   pl-10 pr-10  gap-5 pb-5'>
                    {contactsAp.map(i =>

                        <div key={i.id} className='w-full h-30 flex p-5 items-start bg-white border border-gray-200 rounded-lg shadow z-auto '>
                            <img src={i.profilePic} alt="..." class="shadow rounded-full w-10 h-10 align-middle border-none" />
                            <div className='w-full flex justify-between items-center '>
                                <div className='pl-2'>
                                    <h2 className='text-lg font-bold '> {i.name.length < 16 ? i.name : i.name.substring(0, 16) + '...'}</h2>
                                    <h4 className='text-gray-400'>{i.title.length < 16 ? i.title : i.title.substring(0, 16) + '...'}</h4>

                                </div>
                                <Link href={`contacts/detail/${i.id}`} className=''>

                                    <ArrowIcon />

                                </Link>
                            </div>
                        </div>


                    )}
                </div>
                {onError && <div className='flex items-center justify-center'>
                    <h2 className='text-lg font-bold'>Error connecting to the database</h2>

                </div>

                }

                {noData &&
                    <NoContacts />
                }
            </div>

        </div>
    )
}

export default Dashboard