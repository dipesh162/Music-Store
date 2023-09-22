import HeaderData from '@/app/static/HeaderData';
import Link from 'next/link';
import React, { useState } from 'react'

export default function MenuMobileDrawer(){

    const [showInstruments, setShowInstruments] = useState(false)

    return(
        <div>
            <div className="transition duration-300 delay-1000 ease-in-out w-[80%] absolute top-0 h-[100vh] overflow-auto bg-slate-50 z-10 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]">
                <Link href='/'><h4 className='text-[16px] border-[#ddd] border-b-[1px] py-2 px-4 font-semibold text-[#161616]'>Home</h4></Link>
                <h4 className='text-[16px] border-[#ddd] border-b-[1px] py-2 px-4 font-semibold text-[#161616]' onClick={()=> setShowInstruments(!showInstruments)}>Musical Instruments</h4>
                    {showInstruments && 
                        <div className='border-[#ddd] border-b-[1px]'>
                                {HeaderData.map((data,i)=>(
                                    <div className='pl-6 pt-3'>
                                        <Link href='/'>
                                            <p className="text-[14px] relative font-semibold pb-1.5">{data.name}</p>
                                        </Link>

                                        <div className='ml-2 mb-1'>
                                            {data.items.map((item, i)=> (
                                                <Link href='/'>
                                                    <p className="text-[13px] relative pb-1">{item.name}</p>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                        </div>
                    }
                <Link href='/'><h4 className='text-[16px] border-[#ddd] border-b-[1px] py-2 px-4 font-semibold text-[#161616]'>About</h4></Link>
            </div>
            <div className="top-0 left-0 right-0 bottom-0 flex z-[-1] fixed items-center justify-center bg-black bg-opacity-50"></div>
        </div>
    )
}