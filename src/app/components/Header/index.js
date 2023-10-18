"use client"
import Menu from './Menu'
import MenuMobile from './MenuMobile'


export default function Header(){

    return(
        <div className='border-b-[1px] border-[#e8e8e8]'>
            <Menu/>
            <MenuMobile/>
        </div>
    )
}