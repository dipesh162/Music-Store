'use client'
import { useEffect, useState } from "react";
import axios from "axios";

// Hooks
import { useAppSelector } from "@/redux/hooks";

// Components
import WishlistCard from "../components/Product/WishlistCard";



export default function Wishlist(){

    const user:any = useAppSelector((state)=> state.auth.user)
    const [wishlist, setWishlist] = useState([])

    const fetchData = async () =>{
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_DOMAIN}/api/product/wishlist`,{
                headers: {
                    'Accept': 'application/json',
                    'Authorization': user.token ? `Bearer ${user.token}` : '',
                    'token': user.token ? user.token : '',
                }
            })

            setWishlist(res.data.products)
        } catch (error) {
            
        } 
    }

    useEffect(()=>{
        fetchData()
    },[])

    const handleRemoveItem = async (id: string) =>{

        const res = await axios.delete(`${process.env.NEXT_PUBLIC_DOMAIN}/api/product/wishlist/${id}`, {
            headers: {
                'Accept': 'application/json',
                'Authorization': user.token ? `Bearer ${user.token}` : '',
                'token': user.token ? user.token : '',
            },
        })

        if(res.data.success){
            let updatedWishlist = wishlist.filter((wishlist:any)=> wishlist.product._id != id)
            setWishlist(updatedWishlist)
        }
    }

    return(
        <>
            {wishlist?.length>0 ? 
                <p className="text-[18px]"><b>My Wishlist</b> {wishlist.length} {wishlist.length>1 ? 'items': 'item'} </p> : null
            }

            {wishlist?.map((wishlist:any, i:number)=>(
                <WishlistCard
                    key={i}
                    product={wishlist.product}
                    handleRemoveItem={handleRemoveItem}
                />
            ))
            }
        </>
    )
}