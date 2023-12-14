'use client';

// React
import axios from 'axios';
import Link from 'next/link';
import { toast } from "react-toastify";
import React, { useEffect, useState } from 'react';
import {useRouter} from 'next/navigation';
import "react-toastify/dist/ReactToastify.css";

// Redux
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { saveUserInfo } from '@/redux/slices/authSlice';
import { addToCartThunk } from '@/redux/thunks/cartThunks';


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
    const cartProducts = useAppSelector((state)=> state.cart.cart)

    const onSignUp = async ()=>{
        try {
            setLoading(true)
            const res = await axios.post("/api/users/signup", user)
            if(res.data.success){
                dispatch(saveUserInfo({ user: res.data.user })); // saving user's data in redux
                dispatch(addToCartThunk({type: 'loggedIn', products: cartProducts})) // saving cart info in backend
                toast.success("Registered successfully !", {
                    position: toast.POSITION.BOTTOM_RIGHT,
                  });
                router.push('/')
            }
        } catch (err:any){
            console.log("Signup failed",err )
            toast.error(err.response.data.message,{
                position: toast.POSITION.BOTTOM_RIGHT,
            })
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
            <h1 className='text-[#161616] text-[18px] font-semibold my-4'>Sign Up</h1>
            {/* <label htmlFor="username" style={{color:'black'}}>username</label>
            <input 
                className='p-2 border-[#000000] border-[1px]'
                type="text" 
                id="username"
                value={user.username}
                onChange={(e)=> setUser({...user, username: e.target.value})}
                placeholder='username'
            /> */}
            <label htmlFor="firstName" style={{color:'black'}}></label>
            <input 
                className='w-[75%] md:w-[30%] mb-[22px] p-2 border-[#000000] border-[1px]'
                type="text" 
                id="firstName"
                value={user.firstName}
                onChange={(e)=> setUser({...user, firstName: e.target.value})}
                placeholder='First Name'
            />
            <label htmlFor="lastName" style={{color:'black'}}></label>
            <input 
                className='w-[75%] md:w-[30%] mb-[22px] p-2 border-[#000000] border-[1px]'
                type="text" 
                id="lastName"
                value={user.lastName}
                onChange={(e)=> setUser({...user, lastName: e.target.value})}
                placeholder='Last Name'
            />
            <label htmlFor="email" style={{color:'black'}}></label>
            <input 
                className='w-[75%] md:w-[30%] mb-[22px] p-2 border-[#000000] border-[1px]'
                type="email" 
                id="email"
                value={user.email}
                onChange={(e)=> setUser({...user, email: e.target.value})}
                placeholder='Email'
            />
            <label htmlFor="password" style={{color:'black'}}></label>
            <input 
                className='w-[75%] md:w-[30%] mb-[22px] p-2 border-[#000000] border-[1px]'
                type="password" 
                id="password"
                value={user.password}
                onChange={(e)=> setUser({...user, password: e.target.value})}
                placeholder='Password'
            />
            <button
                onClick={onSignUp}
                disabled={buttonDisabled}
                className='cursor-pointer border-[1px] border-[#616364] bg-[#616364] text-[#fff] px-5 py-2 block text-[16px] text-center font-semibold focus:outline-none'
            >
                Sign Up
            </button>
            <span className='mt-3'>Already have an account?<Link href='/login'> <span className='font-[500] text-[#616364]'>Login here</span></Link></span>

        </div>
    )
}