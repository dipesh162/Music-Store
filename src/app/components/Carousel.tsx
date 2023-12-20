// React
import { useState } from "react"
import { MdOutlineChevronLeft, MdOutlineChevronRight } from "react-icons/md"

export default function Carousel({children: slides}:{children:any}){
    
    const [curr, setCurr] = useState(0)

    const prev = ()=> setCurr(curr => curr ===0 ? slides.length - 1 : curr-1)
    const next = ()=> setCurr(curr => curr === slides.length - 1 ? 0 : curr+1)

    return(
        <div className="overflow-hidden relative w-full max-w-[1190px] m-auto">
            <div className="flex transition-transform ease-out duration-500" style={{ transform: `translateX(-${curr *100}%)`}}>
                {slides}
            </div>
            <div className="absolute inset-0 flex items-center justify-between p-4">
                <button onClick={prev} className="p-0.5 rounded-full shadow bg-white text-gray-800 hover:bg-white">
                    <MdOutlineChevronLeft className="h-[20px] md:h-[30px] w-[20px] md:w-[30px]" />
                </button>
                <button onClick={next} className="p-0.5 rounded-full shadow bg-white text-gray-800 hover:bg-white">
                    <MdOutlineChevronRight className="h-[20px] md:h-[30px] w-[20px] md:w-[30px]" />
                </button>
            </div>

            <div className="absolute bottom-3 right-0 left-0">
                <div className="flex items-center justify-center gap-2">
                    {slides.map((_:any, i:number)=>(
                        <div onClick={()=> setCurr(curr=> i)} className={`hover:cursor-pointer transition-all w-1.5 md:w-3 h-1.5 md:h-3 bg-white rounded-full ${curr ===i ? 'p-1 md:p-2': 'bg-opacity-50'}`}/>
                    ))}
                </div>
            </div>
        </div>
    )
}