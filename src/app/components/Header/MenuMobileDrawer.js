import HeaderData from '@/app/static/HeaderData';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react'
import { BsChevronDown } from 'react-icons/bs';
import UserMenu from './UserMenu';

export default function MenuMobileDrawer({handleDrawer}){

    const [showInstruments, setShowInstruments] = useState(false)
    const drawerRef = useRef(null)
    function useOutsideAlerter(ref) {
        useEffect(() => {
          /**
           * Alert if clicked on outside of element
           */
          function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
            //   alert("You clicked outside of me!");
              handleDrawer()
            }
          }
          // Bind the event listener
          document.addEventListener("mousedown", handleClickOutside);
          return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
          };
        }, [ref]);
      }

    useOutsideAlerter(drawerRef);

    return(
        <div>
            <div ref={drawerRef} className="transition duration-300 delay-1000  pb-6 ease-in-out w-[80%] absolute top-0 h-[100vh] overflow-auto bg-slate-50 z-10 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]">
                <UserMenu/>
                <Link href='/'><h4 className='text-[16px] border-[#ddd] border-b-[1px] py-2 px-4 font-semibold text-[#161616]'>Home</h4></Link>
                <h4 className='text-[16px] border-[#ddd] flex justify-between items-center border-b-[1px] py-2 px-4 font-semibold text-[#161616]' onClick={()=> setShowInstruments(!showInstruments)}>Musical Instruments <BsChevronDown className={`rotate-${showInstruments ? '180' : '0' }`} size={14} color="black"/></h4>
                    {showInstruments && 
                        <div className='border-[#ddd] border-b-[1px]'>
                                {HeaderData.map((data,i)=>(
                                    <div className='pl-6 pt-3' key={i}>
                                        <Link href={data.item.link}>
                                            <p className="text-[14px] relative font-semibold pb-1.5">{data.item.name}</p>
                                        </Link>

                                        <div className='ml-2 mb-1'>
                                            {data.items.map((item, i)=> (
                                                <Link href={item.link} key={i}>
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