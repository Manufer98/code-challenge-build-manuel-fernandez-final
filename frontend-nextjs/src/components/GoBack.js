import Link from 'next/link'
import React from 'react'
import BackIcon from './icons/BackIcon'

function GoBack() {
    return (
        <Link href='/dashboard' type="button" className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200    gap-x-2 sm:w-auto ">
            <BackIcon />
            <span>Back</span>
        </Link>
    )
}

export default GoBack