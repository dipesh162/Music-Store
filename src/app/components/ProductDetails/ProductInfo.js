import { BiShoppingBag } from 'react-icons/bi';
import { FaRegHeart } from 'react-icons/fa';
import ReactImageZoom from 'react-image-zoom';

export default function ProductInfo(){
    const props = {width: 400, height: 250, zoomWidth: 500, img: "1.jpg"};

    return(
        <div className='basis-full'>
            <h2 className="text-[#191d1f] text-2xl font-bold">Yamaha FX280 TBS (Brown Sunburst) Electro Acoustic Guitar</h2>

            <p>Rating stars</p>

            <h2 className="text-[#616364] text-[30px] font-bold">&#8377;11000</h2>
            <p>Inclusive of all taxes</p>

            <div className="flex gap-3">
                <button className='bg-[#616364] text-white p-3 rounded-md flex items-center gap-2'>
                    <BiShoppingBag size={24}/> <span>ADD TO CART</span>
                </button>
                <button className='bg-[#616364] text-white p-3 rounded-md flex items-center gap-2'>
                    <FaRegHeart size={24}/> <span>WISHLIST</span>
                </button>
            </div>

            <p className='text-[#8c8c8c]'>
                FX280 is the perfect acoustic-electric Guitar for beginners. This model provides great Yamaha quality and the natural plugged-in sound which delivers the body resonance. It is ideal for both home and stage performances
            </p>
            {/* <ReactImageZoom {...props} /> */}
        </div>
    )
}
