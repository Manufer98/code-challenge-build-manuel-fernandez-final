import React from 'react'
import Link from 'next/link'

const NoContacts = () => {
  return (
    <div className='flex w-full h-full flex-col items-center pt-5  '>
    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
    </svg>
    <h1 className='text-xl font-bold mb-5 pt-3' >Add contacts to your database</h1>
    <Link
        href="/contacts/add"
        className="bg-primary hover:bg-blue-700 text-white font-bold py-2  px-12 rounded-full m-3"
    >
        Add new contacs</Link>
</div>
  )
}

export default NoContacts