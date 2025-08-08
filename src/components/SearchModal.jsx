import React, { useState } from 'react'
import { CiSearch } from 'react-icons/ci'
import { FiX } from "react-icons/fi"

const SearchModal = (props) => {
    const [input, setInput] = useState("")

    function handleInputChange(e) {
        setInput(e.target.value)
    }

    function handleSearch() {
        if (input.trim() === "") {
            alert("Please enter city name")
            return;
        }
        props.setSearch(input)
        props.setIsSearchModalOpen(false);
    }

    function closeSearchModal() {
        props.setIsSearchModalOpen(false)
    }

    return (

        <section className=' md:hidden  z-40 fixed inset-0 bg-black/40 flex justify-center items-center'>
            <div className=' relative z-50 h-33 w-128 bg-white rounded-2xl p-6  transition-all ease-in-out duration-1000'>

                <h2 className=' text-lg font-semibold text-blue-950/80 '>Search for city weather</h2>

                {/* exit button */}

                <button onClick={closeSearchModal} className=' absolute right-4 top-4 p-1 cursor-pointer'>
                    <FiX className=' h-6 w-6' />
                </button>

                <div className=' h-12 flex mt-2'>
                    <input onChange={handleInputChange} className=' w-5/6 h-full px-4 border border-gray-600/60 rounded-lg focus:outline-none
                                    focus:border-none focus:ring-1 focus:ring-blue-400
                                     text-md text-gray-600 shadow-blue-500 rounded-r-none border-r-0' type="text" placeholder='Search..' />
                    <button onClick={handleSearch} className=' w-1/6 h-full bg-blue-500 grid place-content-center rounded-r-xl cursor-pointer'>
                        <CiSearch className=' text-white h-7 w-7' />
                    </button>
                </div>

            </div>
        </section>
    )



}

export default SearchModal
