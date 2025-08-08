import React from 'react'
import { FiX } from "react-icons/fi"

const FavCitiesModal = (props) => {

    const favCities = ["Chennai", "Bengaluru", "Hyderabad", "Mumbai", "Delhi", "Kochi", "New York", "Tokyo", "London"]

    function handleClick(city) {
        props.setSearch(city);
        handleExit();
    }

    function handleExit() {
        props.setISHamOpen(false);
    }

    return (
        <section className=' lg:hidden fixed inset-0 z-60 bg-black/50 '>
            <div className={` w-60 sm:w-70 md:w-80 h-full bg-white absolute right-0 bottom-0 top-0 py-4 px-4 transform ${props.isHamOpen ? 'translate-x-0' : 'translate-x-0'} transition-transform duration-1000 ease-in-out`}>

                <div className='  pb-2 border-b-2  border-gray-400/70 flex justify-between'>
                    <h3 className='  text-gray-700/70 font-semibold text-sm ml-4'>Favorite Cites</h3>
                    <FiX onClick={handleExit} className=' size-5 hover:scale-150 cursor-pointer' />
                </div>


                <ul className='mt-2'>
                    {
                        favCities.map((city, index) => (
                            <li onClick={() => handleClick(city)} className=' text-gray-700 py-4 px-3 hover:bg-gray-400/40 rounded-xl' key={index}>{city.toUpperCase()}</li>

                        ))
                    }

                </ul>

            </div>

        </section>
    )
}

export default FavCitiesModal
