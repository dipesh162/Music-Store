"use client"

// Components
import Menu from './Menu'
import MenuMobile from './MenuMobile'


export default function Header(){

    return(
        <div className='border-b-[1px] border-[#e8e8e8] relative z-[1]'>
            <Menu/>
            <MenuMobile/>
        </div>
    )
}