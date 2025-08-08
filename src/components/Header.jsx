import React, { useState } from 'react'
import cloudLogo from "../assets/cloud-logo.png"
import { CiSearch } from "react-icons/ci";
import { RxHamburgerMenu } from "react-icons/rx";


const Header = (props) => {

    const [input, setInput] = useState("");

    function handleToggleClick() {
        props.setISHamOpen(prevState => true);
    }

    function handleInputChange(e) {
        setInput(e.target.value)
    }

    function handleSearch() {
        if (input.trim() === "") {
            alert("Enter city name")
            return;
        }
        props.setSearch(input);
        setInput("");
    }

    function handleSearchBtn() {
        props.setIsSearchModalOpen(true);
    }


    return (
        <header className=' px-4 md:px-8 py-3 sticky top-0 left-0 z-20 bg-white shadow flex justify-between  transform translate-x-2'>
            <div className=' flex items-center gap-2'>
                <img src={cloudLogo} alt="logo" className=' h-10 w-10' />
                <h1 className=' text-xl font-all text-blue-500 font-semibold'>Weather App</h1>
            </div>

            <div className=' flex items-center gap-4 '>
                {/* Search Icon btn small device*/}

                <button onClick={handleSearchBtn} className=' md:hidden h-12 w-16 hover:bg-gray-400/50 rounded-xl flex justify-center items-center cursor-pointer transition-all duration-150'>
                    <CiSearch className=' h-7 w-7' />
                </button>

                {/* Search icon for large device */}

                <div className=' hidden h-12 w-60 md:flex'>
                    <input onChange={handleInputChange} value={input} className=' w-4/5 h-full px-4 border border-gray-600/60 rounded-lg focus:outline-none
                    focus:border-none focus:ring-1 focus:ring-blue-400
                     text-md text-gray-500 shadow-blue-500 rounded-r-none border-r-0' type="text" placeholder='Search..' />
                    <button onClick={handleSearch} className=' w-1/5 h-full bg-blue-500 grid place-content-center rounded-r-xl cursor-pointer'>
                        <CiSearch className=' text-white h-7 w-7' />
                    </button>
                </div>

                {/* Hamburger toggle */}
                <button className=' lg:hidden h-12 w-12 bg-blue-600/90 grid place-content-center rounded-lg cursor-pointer hover:bg-blue-600 ' onClick={handleToggleClick}>
                    <RxHamburgerMenu className=' h-8 w-8 text-white' />
                </button>

            </div>

        </header>
    )
}

export default Header
