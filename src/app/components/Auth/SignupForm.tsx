'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import {useRouter} from 'next/navigation';
import  axios from 'axios';
import { toast } from 'react-hot-toast';
import { saveUserInfo } from '@/redux/slices/authSlice';
import { useAppDispatch } from '@/redux/hooks';

export default function SignupForm(){
    const router = useRouter()
    const [user, setUser] = useState({
        email: "",
        password: "",
        firstName: "",
        lastName: ""
    })
    const [buttonDisabled, setButtonDisabled] = useState(false)
    const [loading, setLoading] = useState(false)

    const dispatch = useAppDispatch();

    const onSignUp = async ()=>{
        try {
            setLoading(true)
            const res = await axios.post("/api/users/signup", user)
            dispatch(saveUserInfo({ user: res.data.user }));
            router.push('/login')
        } catch (err:any){
            console.log("Signup failed",err.message )
            toast.error(err.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(()=>{
        if(user.email.length > 0 && user.password.length > 0 && user.firstName.length>0 && user.lastName.length>0){
            setButtonDisabled(false)
        } else {
            setButtonDisabled(true)
        }
    }, [user])
 
    return(
        <div className='flex flex-col items-center justify-center text-[#000000]'>
            <h1 className='text-[#000000]'>{loading ? 'processing': 'Signup'}</h1>
            <br></br>
            {/* <label htmlFor="username" style={{color:'black'}}>username</label>
            <input 
                className='p-2 border-[#000000] border-[1px]'
                type="text" 
                id="username"
                value={user.username}
                onChange={(e)=> setUser({...user, username: e.target.value})}
                placeholder='username'
            /> */}
            <label htmlFor="firstName" style={{color:'black'}}>First Name</label>
            <input 
                className='p-2 border-[#000000] border-[1px]'
                type="text" 
                id="firstName"
                value={user.firstName}
                onChange={(e)=> setUser({...user, firstName: e.target.value})}
                placeholder='username'
            />
            <label htmlFor="lastName" style={{color:'black'}}>lastName</label>
            <input 
                className='p-2 border-[#000000] border-[1px]'
                type="text" 
                id="lastName"
                value={user.lastName}
                onChange={(e)=> setUser({...user, lastName: e.target.value})}
                placeholder='lastName'
            />
            <br></br>
            <label htmlFor="email" style={{color:'black'}}>email</label>
            <input 
                className='p-2 border-[#000000] border-[1px]'
                type="email" 
                id="email"
                value={user.email}
                onChange={(e)=> setUser({...user, email: e.target.value})}
                placeholder='email'
            />
            <br></br>
            <label htmlFor="password" style={{color:'black'}}>password</label>
            <input 
                className='p-2 border-[#000000] border-[1px]'
                type="password" 
                id="password"
                value={user.password}
                onChange={(e)=> setUser({...user, password: e.target.value})}
                placeholder='password'
            />
            <button
                onClick={onSignUp}
                disabled={buttonDisabled}
                className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
            >
                {buttonDisabled ? 'No Sign UP' : 'Sign Up'}
            </button>
            <Link href='/login'>Login here</Link>
        </div>
    )
}