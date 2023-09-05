import React, { useState } from 'react'
import { CSSTransition } from 'react-transition-group';

export default function MenuMobileDrawer(){
    return(
        <div>
            <div className="transition duration-300 delay-1000 ease-in-out w-[80%] absolute top-0 h-[100vh] bg-slate-50 z-10 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]">
                <h1 className='bg-[red]'>asdsa</h1>
                <h1>asdsa</h1>
            </div>
            <div className="top-0 left-0 right-0 bottom-0 flex z-[-1] fixed items-center justify-center bg-black bg-opacity-50"></div>
        </div>
    )
}