'use client'

// React
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { toast } from "react-toastify";

// Hooks
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

// Components
import WishlistCard from "../components/Product/WishlistCard";
import EmptyWishlist from "../components/EmptyWishlist";

// Redux
import { addToCartThunk } from "@/redux/thunks/cartThunks";


export default function Wishlist(){

    const user:any = useAppSelector((state)=> state.auth.user)
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(true);
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
            setIsLoading(false)
        } catch (error: any) {
            console.log(error.response)
        } 
    }

    useEffect(()=>{
        user.token && fetchData()
    },[])

    const handleRemoveItem = async (id: string) =>{

        const res = await axios.delete(`${process.env.NEXT_PUBLIC_DOMAIN}/api/product/wishlist/${id}`, {
            headers: {
                'Accept': 'application/json',
                'Authorization': user.token ? `Bearer ${user.token}` : '',
                'token': user.token ? user.token : '',
            },
        })
        console.log(res)
        if(res.data.success){
            let updatedWishlist = wishlist.filter((wishlist:any)=> wishlist.product._id != id)
            setWishlist(updatedWishlist)
            toast.success("Item is removed from wishlist", {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
        } else {
            console.log('error')
        }
    }

    const handleCart = async (productId:string) =>{
        const res:any = await dispatch(addToCartThunk({type: 'loggedIn', products: [{ productId, quantity: 1 }]}))

        if(res.data.success){
            let updatedWishlist = wishlist.filter((wishlist:any)=> wishlist.product._id != productId)
            setWishlist(updatedWishlist)
            toast.success("Item is moved to cart", {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
        } else {
            toast.error("error adding product to cart", {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
        }
    }

    return(
        <div className="px-2 md:px-4 py-5">
            {!user.token ?
                <h3 className="text-center mt-4">Please <Link href='/login' className="font-semibold">login</Link> to add items in wishlist</h3> :
            
                !isLoading ?
                <>
                    {wishlist?.length>0 ? 
                        <div>
                            <p className="text-[18px] text-center md:text-left mb-4"><b>My Wishlist</b> {wishlist.length} {wishlist.length>1 ? 'items': 'item'} </p>
                        
                            <div className="flex flex-col md:flex-row flex-wrap gap-3 md:gap-6 items-center">
                                {wishlist?.map((wishlist:any, i:number)=>(
                                    <WishlistCard
                                        key={i}
                                        product={wishlist.product}
                                        handleRemoveItem={handleRemoveItem}
                                        handleCart={handleCart}
                                    />
                                ))}
                            </div>
                        </div> : <EmptyWishlist/>
                    }
                </> : null
            }
        </div>
    )
}