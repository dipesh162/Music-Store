'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import {useRouter} from 'next/navigation';
import  axios from 'axios';
import { toast } from 'react-hot-toast';
import { useAppDispatch } from '@/redux/hooks';
import { saveUserInfo } from '@/redux/slices/authSlice';


export default function LoginPage(){
    const router = useRouter()
    const [user, setUser] = useState({
        email: "",
        password: ""
    })
    const [buttonDisabled, setButtonDisabled] = useState(false)
    const [loading, setLoading] = useState(false)

    const dispatch = useAppDispatch();

    const onLogin = async ()=>{
        try {
            setLoading(true)
            const res = await axios.post("/api/users/login", user);
            dispatch(saveUserInfo({ user: res.data.user }));
            toast.success("Login SUccess")
            router.push('/profile')
        } catch (error: any) {
            console.log("login failed", error.message)
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(()=>{
        if(user.email.length > 0 && user.password.length > 0){
            setButtonDisabled(false)
        } else {
            setButtonDisabled(true)
        }
    }, [user])

    return(
        <div className='flex flex-col items-center justify-center text-[#000000]'>
            <h1 className='text-[#000000]'>Login</h1>
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
                onClick={onLogin}
                className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
            >
                {buttonDisabled ? 'No Login' : 'Login'}
            </button>
            <Link href='/signup'>Signup here</Link>
        </div>
    )
}