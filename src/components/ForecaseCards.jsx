import React from 'react'
import { WiCloudy, WiDegrees } from 'react-icons/wi'
import { weatherIcons } from './WeatherIcons'



const ForecaseCards = (props) => {

    const days = props.days

    return (
        <section className=' mt-16 mx-auto px-20 max-w-3xl flex gap-x-10 gap-y-15 flex-wrap justify-center mb-8'>
            {/* Card */}

            {
                days.map((day, index) => {

                    const Icon = weatherIcons[day.data.weather[0].main] || WiCloudy

                    return (

                        <div key={index} className=' h-55 w-39 flex flex-col justify-between items-center py-2 border-2 border-gray-700 rounded-2xl hover:-translate-y-10 hover:transition-all hover:duration-500 hover:border-4 hover:border-blue-500 hover:shadow-blue-400'>
                            <h3 className=' text-lg text-gray-700'>{day.dayName}</h3>
                            <Icon className=' w-24 h-24 text-gray-700' />
                            <div className=' ml-5 flex justify-center items-center'>
                                <div className='  flex gap-0 items-center justify-center'>
                                    <span className=' text-gray-700 font-semibold'>{Math.ceil(day.data.main.temp_max)}</span>
                                    <WiDegrees className=' size-16 mt-3 -ml-[26px]  text-gray-700' />
                                </div>

                                <div className=' flex gap-0 items-center justify-center'>
                                    <span className=' text-gray-500 font-semibold'>{Math.floor(day.data.main.temp_min)}</span>
                                    <WiDegrees className=' size-16 mt-3 -ml-[26px]  text-gray-500' />
                                </div>

                            </div>

                        </div>
                    )

                })


            }



        </section>
    )
}

export default ForecaseCards
