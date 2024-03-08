'use client'

import Button from '@/components/Button'
import Input from '@/components/Input'
import InputError from '@/components/InputError'
import Label from '@/components/Label'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import AuthSessionStatus from '@/app/(auth)/AuthSessionStatus'

const Login = () => {
    const router = useRouter()

    const { login } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/dashboard',
    })

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [shouldRemember, setShouldRemember] = useState(false)
    const [errors, setErrors] = useState([])
    const [status, setStatus] = useState(null)

    useEffect(() => {
        if (router.reset?.length > 0 && errors.length === 0) {
            setStatus(atob(router.reset))
        } else {
            setStatus(null)
        }
    })

    const submitForm = async event => {
        event.preventDefault()

        login({
            email,
            password,
            remember: shouldRemember,
            setErrors,
            setStatus,
        })
    }

    return (
        <div className='flex w-full h-full flex-col items-center justify-center  '>
            
             <h1 className='text-3xl m-5 font-extrabold'>Welcome</h1>
            <AuthSessionStatus className="mb-4" status={status} />
            <form onSubmit={submitForm}>

             
                <div>
                    <Label htmlFor="email" className='font-bold'>Email</Label>

                    <Input
                        id="email"
                        type="email"
                        value={email}
                        placeholder="john@doe.com" 
                        className="w-50 bg-pink appearance-none  rounded  py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        onChange={event => setEmail(event.target.value)}
                        required
                        autoFocus
                    />

                    <InputError messages={errors.email} className="mt-2" />
                </div>

              
                <div className="mt-4 ">
                    <Label htmlFor="password" className='font-bold'>Password</Label>

                    <Input
                        id="password"
                        type="password"
                        value={password}
                        placeholder='**************'
                        className="bg-pink appearance-none  rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        onChange={event => setPassword(event.target.value)}
                        required
                        autoComplete="current-password"
                    />

                    <InputError
                        messages={errors.password}
                        className="mt-2"
                    />
                </div>

               

                <div className="flex items-center justify-center mt-4">

                    <Button className="bg-primary hover:bg-blue-700 text-white font-bold py-2  px-12 rounded-full m-3">Login</Button>
                </div>
            </form>
        </div>
    )
}

export default Login
