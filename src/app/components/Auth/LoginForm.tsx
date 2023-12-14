'use client';

// React
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import {useRouter} from 'next/navigation';
import { toast } from "react-toastify";

// Redux
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { saveUserInfo } from '@/redux/slices/authSlice';
import { addToCartThunk } from '@/redux/thunks/cartThunks';


export default function LoginForm(){

    const router = useRouter()
    const [user, setUser] = useState({
        email: "",
        password: ""
    })
    const [buttonDisabled, setButtonDisabled] = useState(false)
    const [loading, setLoading] = useState(false)

    const dispatch = useAppDispatch();
    const cartProducts = useAppSelector((state)=> state.cart.cart)

    const onLogin = async ()=>{
        try {
            setLoading(true)
            const res = await axios.post("/api/users/login", user);
            if(res.data.success){
                dispatch(saveUserInfo({ user: res.data.user })); // saving user's data in redux
                dispatch(addToCartThunk({type: 'loggedIn', products: cartProducts})) // saving cart info in backend
                toast.success("Logged in successfully !", {
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
                router.push('/')
            }
        } catch (error: any) {
            console.log("login failed", error.message)
            toast.error(error.response.data.message,{
                position: toast.POSITION.BOTTOM_RIGHT,
            })
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