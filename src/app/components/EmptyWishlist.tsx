// Icons
import { FaRegHeart } from "react-icons/fa6";

export default function(){
    return(
        <div className="flex flex-col items-center mt-4">
            <FaRegHeart size={100}/>
            <h3 className="text-[18px] font-medium">Wishlist is empty</h3>
        </div>
    )
}