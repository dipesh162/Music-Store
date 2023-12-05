// React
import axios from 'axios';
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from 'react-icons/fa';
import { useAppSelector } from '@/redux/hooks';
import { FC, useEffect, useState } from "react";
import { AiOutlineHeart } from 'react-icons/ai';
import { AiFillHeart } from "react-icons/ai";


interface pageProps{
    productId:string;
    btnType:string;
}

const WishlistBtn: FC<pageProps> = ({productId,btnType}) =>{

    const [showWishlistBtn, setShowWishlistBtn] = useState(false)
    const [wishListed, setWishlisted] = useState(false)
    const user:any = useAppSelector((state)=> state.auth.user)

    const checkWishlistStatus = async () =>{
        const res = await axios.get(`/api/product/wishlist/status`,{
            headers: {
                'Accept': 'application/json',
                'Authorization': user.token ? `Bearer ${user.token}` : '',
                'token': user.token ? user.token : '',
            },
            params:{
                productId,
                userEmail:user.email
            }
        }) 
        setWishlisted(res.data.isWishListed)
        setShowWishlistBtn(true)
    }
    useEffect(()=>{
        checkWishlistStatus()
    },[])


    const handleWishlisting = async ()=>{
        const res = await axios.post(`/api/product/wishlist`,{
            productId:productId
        },{
            headers: {
                'Accept': 'application/json',
                'Authorization': user.token ? `Bearer ${user.token}` : '',
                'token': user.token ? user.token : '',
              },
        })
        if(res.data.success) {
            setWishlisted(!wishListed)
        }
    }

    return(
        showWishlistBtn ? 
        <>
            {btnType == 'button' ?
                <button disabled={wishListed} onClick={handleWishlisting} className={`${wishListed? 'bg-[#616364]' : 'bg-[#fff]'} ${wishListed ? 'text-[#fff]': 'text-[#616364]'} font-semibold border-[#616364] border-[2px] text-[14px] md:text-base px-3 py-2 rounded-md flex items-center gap-1.5`}>
                    {wishListed ?
                        <FaHeart size={20}/> :
                    <FaRegHeart size={20}/>}
                    <span className='text-[14px]'>{wishListed? 'WISHLISTED': 'WISHLIST'}</span>
                </button> :

                <>
                    {wishListed ?
                        <AiFillHeart className='absolute right-2 top-2 hover:cursor-pointer' onClick={handleWishlisting} size={22} color='#616364'/>:
                        <AiOutlineHeart className='absolute right-2 top-2 hover:cursor-pointer' onClick={handleWishlisting} size={22}/>
                    }
                </>
            }
        </> : null
    )
}

export default WishlistBtn