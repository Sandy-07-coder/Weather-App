import React from 'react'
import { weatherIcons } from './WeatherIcons';

const FavoriteCities = (props) => {

    const favCities = ["Chennai", "Bengaluru", "Hyderabad", "Mumbai", "Delhi", "Kochi", "New York", "Tokyo", "London"]

    function handleClick(city) {
        props.setSearch(city);
    }

    return (
        <section className=' fixed h-full overflow-y-auto px-6 mx-6 border-l-2 border-gray-600/30 py-6'>
            <h3 className=' text-gray-700/70 font-semibold text-sm border-b-2 ml-4 border-gray-700/40 pb-2'>Favorite Cites</h3>

            <ul className='mt-2'>
                {
                    favCities.map((city, index) => (
                        <li onClick={() => handleClick(city)} className=' text-gray-700 py-4 px-3 hover:bg-gray-400/40 rounded-xl' key={index}>{city.toUpperCase()}</li>

                    ))
                }

            </ul>

        </section>
    )
}

export default FavoriteCities
