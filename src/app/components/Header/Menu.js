import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BiShoppingBag } from 'react-icons/bi';
import { BsChevronDown } from 'react-icons/bs';
import { FaRegUser } from 'react-icons/fa';
import { FaRegHeart } from 'react-icons/fa';
import { CSSTransition } from 'react-transition-group';
import HeaderData from '../../static/HeaderData'


export default function Menu(){

    const [instrumentsMenu, setInstrumentsMenu] = useState(false)

    return(
        <>
            <div className="hidden md:flex bg-white justify-between pr-6 relative">
                <Link href='/'>
                    <Image
                        src='/images/music-store.jpg'
                        width={'150'}
                        height={'50'}
                    />
                </Link>
                <ul className="flex gap-7 items-center">
                    <Link href='/'><li className="h-full hover:cursor-pointer text-[#161616] font-semibold flex gap-2 items-center">Home</li></Link>
                    <li className="h-full hover:cursor-pointer text-[#161616] flex gap-2 items-center" onMouseEnter={() => setInstrumentsMenu(true)} onMouseLeave={() => setInstrumentsMenu(false)}>
                        <div className="flex items-center gap-2 font-semibold">Musical Instruments <BsChevronDown size={14} color="black"/></div>
                        <CSSTransition
                            in={instrumentsMenu}
                            // in={true}
                            // timeout={2000}
                            classNames="transitions"
                            unmountOnExit
                        >
                            <div className="absolute left-[50%] -translate-x-1/2 bg-white top-[86px] flex flex-row gap-8 w-max px-9 py-6 z-10" style={{boxShadow: '0 4.5px 4.5px rgba(0,0,0,.19)'}}>
                                {HeaderData.map((data,i)=>(
                                    <div key={i}>
                                        <Link href={data.item.link}>
                                            <p className="
                                            hover:after:content-[''] hover:after:absolute hover:after:w-full hover:after:h-[2px] hover:after:left-0 hover:after:bottom-0 hover:after:bg-[#0087ca] hover:after:scale-x-0 hover:after:origin-bottom-right 
                                            relative font-semibold pb-1.5">{data.item.name}</p>
                                        </Link>

                                        {data.items.map((item, i)=> (
                                            <Link href={item.link} key={i}>
                                                <p className="
                                                hover:after:content-[''] hover:after:absolute hover:after:w-full hover:after:h-[2px] hover:after:left-0 hover:after:bottom-0 hover:after:bg-[#0087ca] hover:after:scale-x-0 hover:after:origin-bottom-right hover:after:ease-out hover:after:duration-75 
                                                relative pb-1 text-[14px]">{item.name}</p>
                                            </Link>
                                        ))}
                                    </div>
                                ))
                                }
                            </div>
                        </CSSTransition>
                    </li>
                    <Link href='/'><li className="h-full hover:cursor-pointer text-[#161616] font-semibold flex gap-2 items-center">About</li></Link>
                </ul>
                <div className="flex items-center gap-3.5">
                    <FaRegUser size={22} color="black" className="hover:cursor-pointer"/>
                    <FaRegHeart size={22} color="black" className="hover:cursor-pointer"/>
                    <BiShoppingBag size={24} color="black" className="hover:cursor-pointer"/>
                </div>
            </div>
        </>
    )
}