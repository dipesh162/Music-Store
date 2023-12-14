"use client"

// React
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

// Hooks
import { useAppDispatch } from "@/redux/hooks";
import { reset } from "@/redux/slices/authSlice";


export default function ProfilePage(){
    const router = useRouter()
    const [data, setData] = useState("nothing")

    const dispatch = useAppDispatch();

    const logout = async () =>{
        try {
            await axios.get('/api/users/logout')
            dispatch(reset())
            toast.success("Logged out successfully !", {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
            router.push('/login')
        } catch (error:any) {
            console.log(error.message)
            toast.error(err.response.data.message,{
                position: toast.POSITION.BOTTOM_RIGHT,
            })
        }
    }

    const getUserDetails = async ()=>{
        const res = await axios.get('/api/users/me')
        console.log(res.data)
        setData(res.data.data._id)
    }

    return(
        <div className="flex">
            <h1>Profile</h1>
            <h2 className="p-3 rounded bg-green-500">{data === 'nothing' ? "Nothing" : <Link href={`/profile/${data}`}>{data}</Link>}</h2>
            <hr />
            {/* <button 
                className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={logout}
            >
                Logout
            </button> */}

            <button
                onClick={getUserDetails}
                className="bg-purple-900 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Get User Detauls
            </button>
        </div>
    )
}