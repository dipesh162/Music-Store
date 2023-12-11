'use client'

// React
import { FC, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// Icons
import { BiShoppingBag } from 'react-icons/bi';
import { AiFillStar } from 'react-icons/ai';

// Components
import WishlistBtn from './WishlistBtn';

// Hooks
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

// Redux
import { addToCartThunk } from '@/redux/thunks/cartThunks';


export interface FormDataType {
    _id: string;
    name: string;
    brand: string;
    category: string;
    subCategory: string;
    description: string;
    price: number;
    ratings: number;
    images: string[]  
}

interface pageProps{
    product:FormDataType
}

const ProductInfo: FC<pageProps> = ({product}) =>{

    const dispatch = useAppDispatch();
    const user = useAppSelector((state)=> state.auth.user)
    const cart = useAppSelector((state)=> state.cart.cart)

    const handleCheckProductInCart = () =>{
        return cart.some((item)=> item.productId == product._id)
    }
    const [addedToCart, setAddedToCart] = useState(cart.length>0 ? handleCheckProductInCart() : false)

    const router = useRouter()
    const handleRedirectToCart = ()=>{
        router.push(`${process.env.NEXT_PUBLIC_DOMAIN}/viewcart`)
    }

    const props = {width: 400, height: 250, zoomWidth: 500, img: "1.jpg"};

    const handleCart = () =>{
        if(!user.token){ // user is logged out
            dispatch(addToCartThunk({type: 'loggedOut', productId: product._id, quantity: 1}))
        } else { // user is logged in
            dispatch(addToCartThunk({type: 'loggedIn', products: [{ productId: product._id, quantity: 1 }]}))
        }
        setAddedToCart(true)
        // handleRedirectToCart()
    }

    return(
        <div className='basis-full text-center md:text-left'>
            <h2 className="text-[#191d1f] text-[16px] md:text-[24px] font-[400] leading-[25px]">{product.name}</h2>

            <div className='rounded-[3px] mx-auto mt-2 md:mx-0 text-white py-0.5 pr-1 pl-1.5 bg-[#388E3C] flex items-center gap-1 w-fit'>
                {product.ratings} <AiFillStar size={13} color="fff"/>
            </div>

            <h2 className="text-[#191d1f] text-[20px] md:text-[28px] font-semibold mb-1.5 md:mb-0 mt-1 md:mt-0">&#8377;{product.price.toLocaleString()}</h2>
            <p className='-mt-[8px] text-[14px]'>Inclusive of all taxes</p>

            <div className="hidden md:flex gap-3 my-3 mx-0 justify-center items-center md:justify-normal">
                {!addedToCart ?
                    <button onClick={handleCart} className='bg-[#616364] font-semibold border-[2px] border-[#616364]  text-white text-[14px] md:text-base px-3 py-2 rounded-md flex items-center gap-1.5'>
                        <BiShoppingBag size={20}/> <span className='text-[14px]'>ADD TO CART</span>
                    </button> :
                    <Link href={`${process.env.NEXT_PUBLIC_DOMAIN}/viewcart`} className='bg-[#616364] font-semibold border-[2px] border-[#616364]  text-white text-[14px] md:text-base px-3 py-2 rounded-md flex items-center gap-1.5'>
                        <BiShoppingBag size={20}/> <span className='text-[14px]'>GO TO CART</span>
                    </Link>
                }
                <WishlistBtn productId={product._id} btnType='button'/>
            </div>

            <p className='text-[#191d1f] text-left text-[14px]'>{product.description}</p>
            {/* <ReactImageZoom {...props} /> */}
        </div>
    )
}

export default ProductInfo