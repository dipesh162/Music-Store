// React
import { useEffect, useState } from "react"

// Hooks
import { useAppSelector } from "@/redux/hooks"

export default function CartTotal({cartProducts}:any){
    const cart = useAppSelector((state)=> state.cart.cart)
    const [total, setTotal] = useState(0)
    const [totalItems, setTotalItems] = useState(0)

    function calculateTotal(){
        if(cartProducts.length>0){
            const totalAmount = cartProducts.reduce((acc:any,item:any)=>{
                let cartItem:any = cart.find((cart)=> cart.productId == item._id)
                return acc + ((cartItem.quantity)*(item.price))
            },0)
            setTotal(totalAmount)

            const totalItems = cart.reduce((acc:any,item:any)=>{
                return acc + item.quantity
            },0)
            setTotalItems(totalItems)
        }
    }

    useEffect(()=>{
        calculateTotal()
    },[])

    useEffect(()=>{
        calculateTotal()
    },[cart])

    return(
        <>
            {(totalItems && total) ?
                <div>
                    Price Details {totalItems} items
                    <h1 className="text-[#000] text-[24px]">Total: {total.toLocaleString('')}</h1>
                </div> : null
            }
        </>
    )
}