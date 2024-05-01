import React from 'react'
import Link from 'next/link'
import SearchIcon from '@/components/icons/SearchIcon'

const NoContacts = () => {
    return (
        <div className='flex w-full h-full flex-col items-center pt-5  '>
            <SearchIcon />

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