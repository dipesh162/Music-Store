'use client'

// React
import { useEffect, useState } from "react"
import axios from "axios"

// Components
import CartCard from "../components/Product/CartCard"
import EmptyCart from "../components/EmptyCart"
import CartTotal from "../components/CartTotal"

// Redux
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { removeFromCartThunk } from "@/redux/thunks/cartThunks"

export default function ViewCart(){

    const user:any = useAppSelector((state)=> state.auth.user)
    const cart = useAppSelector((state)=> state.cart.cart)
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const [cartProducts, setCartProducts] = useState([])

    const fetchData = async () =>{
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_DOMAIN}/api/product/cart`,{
                params:{
                    cart: cart
                },
                headers: {
                    'Accept': 'application/json',
                    'Authorization': user.token ? `Bearer ${user.token}` : '',
                    'token': user.token ? user.token : '',
                }
            })

            setCartProducts(res.data.products)
            setIsLoading(false)
        } catch (error) {
            console.log(error)
        } 
    }

    useEffect(()=>{
        fetchData()
    },[])

    const handleUpdateCart= (productIds: any)=>{
        let idsToRemove = productIds
        let updatedCart: any = cartProducts.filter(item => !idsToRemove.includes(item._id));
        setCartProducts(updatedCart)
    }

    const handleDelete = async (productIds:any)=>{
        if(!user.token){ // user is logged out
            dispatch(removeFromCartThunk({type: 'loggedOut', productIds: productIds}))
            handleUpdateCart(productIds)
        } else { // user is logged in
            const res:any = await dispatch(removeFromCartThunk({type: 'loggedIn', productIds: productIds}))
            if(res.data.success){
                handleUpdateCart(productIds)
            }
        }
    }

    return(
        <>
            {!isLoading ?
                <>
                    { cartProducts.length>0 ?
                        <div className="flex flex-col md:flex-row md:justify-around mt-4">
                            <div>
                                {cartProducts.map((cartProd:any,i:number)=>(
                                    <CartCard
                                        key={i}
                                        userAuthState={user.token ? 'loggedIn' : 'loggedOut'}
                                        product={cartProd}
                                        handleDelete={handleDelete}
                                    />
                                ))}
                            </div>
                            
                            <CartTotal 
                                cartProducts={cartProducts}
                            />
                        </div> : <EmptyCart/>
                    }
                </> : null
            }
        </>
    )
}