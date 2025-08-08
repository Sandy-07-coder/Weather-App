import React from 'react'
import { RiCelsiusFill } from 'react-icons/ri';
import { WiDayCloudy, WiWindy, WiCloud, WiRaindrop, WiSunrise, WiSunset, WiDaySunny, WiCloudy } from "react-icons/wi";
import { weatherIcons } from './WeatherIcons';

const CurrentWeather = (props) => {


    const temp = Math.round(props.temp.current)
    let color = ""
    const humidity = { name: "Humidity", val: `${props.weather.humidity}%` }
    const windSpeed = { name: "Wind Speed", val: `${props.weather.windSpeed} Km/h` }
    const cloud = { name: "Cloud", val: `${props.weather.clouds}%` }
    const sun = {
        rise: props.sun.rise,
        set: props.sun.set
    }
    if (temp > 35) {
        color = "text-red-500"
    }
    else if (temp > 15) {
        color = "text-green-600"
    }
    else {
        color = "text-blue-500"
    }

    let placeStr

    // In some of the country there is no state so we can manage by conditions

    if (props.place.state) {
        placeStr = props.place.city + ", " + props.place.state + ", " + props.place.country
    }
    else {
        placeStr = props.place.city + ", " + props.place.country
    }



    const Icon = weatherIcons[props.weather.title] || WiCloudy;

    return (
        <section className=' mt-12 lg:mt-16'>

            {/* Date and Place */}

            <div className='flex flex-col flex-nowrap justify-center items-center gap-2'>
                <h2 className=' text-2xl md:text-3xl text-gray-600 '>{props.currentDate}</h2>
                <h2 className=' text-xl md:text-2xl text-gray-500 '>{placeStr}</h2>
            </div>

            {/* Weather symbol and temperature */}
            <div className='mt-8 flex justify-center items-center gap-2 md:gap-3'>
                <Icon className='w-36 h-36 md:w-48 md:h-48 text-gray-600' />
                <span className={`text-7xl md:text-9xl ${color}`}>{temp}</span>
                <RiCelsiusFill className={`w-8 h-8 md:w-16 md:h-16 -mt-12 sm:-mt-20 ${color}`} />
            </div>

            {/* Weather desc */}

            <div className=' w-3/4 mx-auto mt-10 flex flex-col items-center gap-2'>
                <h2 className=' text-2xl md:text-3xl text-gray-700/90 font-semibold'>Partially cloudly</h2>
            </div>

            {/* Weather Card */}

            <div className=' h-47 w-41 md:h-20 md:w-112 mx-auto px-2 py-4 my-12 flex flex-col md:flex-row gap-2 justify-evenly items-start bg-gray-600 rounded-2xl'>

                <div className={`relative group flex items-center `} >

                    <WiRaindrop className='text-white w-12 h-12 ' />
                    <span className=' text-white text-lg' >{humidity.val}</span>
                    {/* chip */}
                    <span className=' absolute top-0 left-1/3 -mt-8 bg-sky-500 px-2 py-1 rounded-xl shadow-blue-400 text-white
                    opacity-0 group-hover:opacity-100'>{humidity.name}</span>
                </div>

                <div className='relative group flex items-center '>

                    <WiWindy className='text-white w-12 h-12 ' />
                    <span className=' text-white text-lg ml-1' >{windSpeed.val}</span>
                    {/* chip */}

                    <span className=' absolute top-0 left-1/6 -mt-6 bg-sky-500 px-1 py-1 rounded-xl shadow-blue-400 text-white text-nowrap
                    opacity-0 group-hover:opacity-100'>{windSpeed.name}</span>


                </div>

                <div className=' relative group flex items-center '>
                    <WiCloud className='text-white w-12 h-12 ' />
                    <span className=' text-white text-lg ml-2' >{cloud.val}</span>

                    {/* chip */}

                    <span className=' absolute top-0 left-1/2 -mt-6 bg-sky-500 px-2 py-1 rounded-xl shadow-blue-400 text-white text-nowrap
                    opacity-0 group-hover:opacity-100'>{cloud.name}</span>

                </div>

            </div>

            {/* Sunset and Sunrise */}

            <div className=' my-4 flex justify-center items-center gap-10 sm:gap-14 md:gap-20 lg:gap-24'>
                <div className=' relative group'>
                    <WiSunrise className='w-16 h-16 text-yellow-600' />
                    <time className=' text-gray-700 font-semibold'>{sun.rise}</time>

                    <span className=' absolute -top-2 -left-2 -mt-6 bg-sky-500 px-2 py-1 rounded-xl shadow-blue-400 text-white text-nowrap
                    opacity-0 group-hover:opacity-100'>Sun Rise</span>
                </div>

                <div className=' relative group'>
                    <WiSunset className='w-16 h-16 text-orange-500' />
                    <time>{sun.set}</time>

                    <span className=' absolute -top-2 -left-2 -mt-6 bg-sky-500 px-2 py-1 rounded-xl shadow-blue-400 text-white text-nowrap
                    opacity-0 group-hover:opacity-100'>Sun Set</span>
                </div>




            </div>


        </section>
    )
}

export default CurrentWeather
