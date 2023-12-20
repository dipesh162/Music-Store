// React
import Link from "next/link";
import Image from "next/image";

// Static
import BannerData from "@/app/static/BannerData";

// Components
import Carousel from "../Carousel";

export default function Banners(){
    return(
        <div className="max-w-full m-auto">
            <Carousel>
               {BannerData.map((s:any,i:number)=> (
                    // <Link href={s.link} className="relative block w-[1400px] h-[200px]">
                        <Image
                            height={200}
                            width={1100}
                            key={i}
                            // fill={true}
                            src={s.img}
                            alt='carousel slide'
                            className="w-[1400px] h-[auto]"
                        />
                    // </Link>
               ))}
            </Carousel>
        </div>
    )
}