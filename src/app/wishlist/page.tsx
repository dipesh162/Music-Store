'use client'
import { useAppSelector } from "@/redux/hooks";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/Product/ProductCard";



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
                <p><b>My Wishlist</b> {wishlist.length} {wishlist.length>1 ? 'items': 'item'} </p> : null
            }

            {wishlist?.map((product:any, i:number)=>(
                <ProductCard
                    key={i}
                    product={{...product.product, cta:'cart',quantity: product.quantity}}
                    handleRemoveItem={handleRemoveItem}
                />
            ))
            }
        </>
    )
}