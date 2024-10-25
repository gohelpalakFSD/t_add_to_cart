import React, { useState } from 'react'
import { RxHamburgerMenu } from "react-icons/rx";

function Header() {
    const [nav, setnav] = useState(false)
    return (
        <>
            <div>
                <header className='bg-black text-gray-50 py-4'>
                    <div className="container mx-auto">
                        <div className='flex justify-between items-center'>
                            <div>
                                <h1>Shopdot.</h1>
                            </div>
                            <nav>
                                <ul className='md:flex items-center hidden'>
                                    <li className='px-4'>
                                        <a href='#'>Home</a>
                                    </li>
                                    <li className='px-4' >
                                        <a href='#'>About</a>
                                    </li>
                                    <li className='px-4'>
                                        <a href='#'>Contact</a>
                                    </li>
                                    <li className='px-4'>
                                        <button className='px-3 py-1 bg-blue-300 text-black font-bold'>Login</button>
                                    </li>
                                </ul>
                                <button className='md:hidden me-5' onClick={()=>{setnav(!nav)}}>
                                    <RxHamburgerMenu />
                                </button>
                            </nav>
                        </div>
                    </div>
                </header>
            </div>
            <div>
                <div className= {`sidebar fixed h-full w-1/2 bg-black text-white md:hidden top-0 pt-20 z-10 transition-all -left-96 ${nav?"left-0":""}`}>
                    <nav>
                        <ul>
                            <li className='px-4 mb-5'>
                                <a href='#'>Home</a>
                            </li>
                            <li className='px-4 mb-6' >
                                <a href='#'>About</a>
                            </li>
                            <li className='px-4 mb-6'>
                                <a href='#'>Contact</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    )
}

export default Header