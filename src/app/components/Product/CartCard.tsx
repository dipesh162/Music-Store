// React
import { useRef, useState } from 'react'
import Image from 'next/image'

// Hooks
import useOutsideAlerter from '@/hooks/useOutsideDetect';
import { useAppDispatch } from '@/redux/hooks';

// Icons
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

// Redux
import { updateCartThunk } from '@/redux/thunks/cartThunks';

export default function CartCard({product, handleDelete, userAuthState}:{product:any, handleDelete: any , userAuthState: string}){
    const dispatch = useAppDispatch();

    const [quantity, setQuantity] = useState(product.productCartQuantity)
    const updateQuantity = (quantity:number)=>{
        if(quantity == 0){
            handleDelete([product._id])
        } else {
            dispatch(updateCartThunk({type: userAuthState, productId: product._id, quantity}))
            setQuantity(quantity)
        }
    }

    const [quantityDropdown,setQuantityDropdown] = useState(false)
    const toggleQuantityDropdown = () =>{
        setQuantityDropdown((prevState)=> !prevState)
    }

    const dropDownRef = useRef(null)
    useOutsideAlerter(dropDownRef,toggleQuantityDropdown);


    return(
        <div>
            <Image
                src={product?.images[0]}
                width={155}
                height={155}
                alt="Product Image"
                className='pb-1 m-auto'
            />
            <h2>{product.name}</h2>
            <h2>&#8377;{(product.price).toLocaleString()}</h2>

            <div className='flex items-center gap-3'>
                <div className='w-fit cursor-pointer relative py-1.5 pl-[11.5px] pr-[8px] bg-[#F0F2F2] border-[#BBBFBF] border-[1px] rounded-[8px] shadow-[0_2px_5px_0px_rgba(213,217,217,.5)]' onClick={()=> setQuantityDropdown((prevState)=> !prevState)}>
                    <div className='flex items-center gap-1'>Qty: {quantity} <span className='rotate-[90]'><MdOutlineKeyboardArrowDown size={20}/></span></div>
                    { quantityDropdown && 
                        <div ref={dropDownRef} className="w-full absolute py-1.5 left-[0.5px] top-0 z-[10px] bg-[#fff] border-[#BBBFBF] border-[1px] rounded-[8px] shadow-[0_2px_5px_rgba(15,17,17,.15)]">
                            {[ ... Array(10)].map((item,i)=>(
                                <div className='' onClick={()=>updateQuantity(i)}>
                                    {i ===0 ? <span className='pl-1'>0 (Delete)</span>: <div className={quantity == i ? 'bg-[#EDFDFF] border-[#D5D9D9] border-[1px]  pl-1 py-0.5' : 'pl-1 py-0.5'}>{i}</div>}
                                </div>
                            ))}
                        </div>
                    }
                </div>
                |
                <div className='cursor-pointer hover:underline' onClick={()=>handleDelete([product._id])}>Delete</div>
            </div>
        </div>
    )
}