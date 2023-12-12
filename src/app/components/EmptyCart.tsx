// Icons
import { PiHandbagDuotone } from "react-icons/pi";

export default function EmptyCart(){
    return(
        <div className="flex flex-col items-center mt-4">
            <PiHandbagDuotone size={100}/>
            <h3 className="text-[18px] font-medium">Bag is empty</h3>
        </div>
    )
}