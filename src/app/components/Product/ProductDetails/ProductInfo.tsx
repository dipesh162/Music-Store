import { FC } from 'react';
import { BiShoppingBag } from 'react-icons/bi';
import { FaRegHeart } from 'react-icons/fa';

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

    const props = {width: 400, height: 250, zoomWidth: 500, img: "1.jpg"};

    return(
        <div className='basis-full text-center md:text-left'>
            <h2 className="text-[#191d1f] text-base md:text-2xl font-bold">Yamaha FX280 TBS (Brown Sunburst) Electro Acoustic Guitar</h2>

            <p>Rating stars: {product.ratings}</p>

            <h2 className="text-[#616364] text-[30px] font-bold">&#8377;{product.price.toLocaleString()}</h2>
            <p>Inclusive of all taxes</p>

            <div className="flex gap-3 my-3 mx-0 justify-center md:justify-normal">
                <button className='bg-[#616364] text-white text-[14px] md:text-base px-3 py-2.5 rounded-md flex items-center gap-2'>
                    <BiShoppingBag size={24}/> <span>ADD TO CART</span>
                </button>
                <button className='bg-[#616364] text-white text-[14px] md:text-base px-3 py-2.5 rounded-md flex items-center gap-2'>
                    <FaRegHeart size={24}/> <span>WISHLIST</span>
                </button>
            </div>

            <p className='text-[#8c8c8c]'>{product.description}</p>
            {/* <ReactImageZoom {...props} /> */}
        </div>
    )
}

export default ProductInfo