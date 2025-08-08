import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import SearchModal from './components/SearchModal'
import CurrentWeather from './components/CurrentWeather'
import ForecaseCards from './components/ForecaseCards'
import FavoriteCities from "./components/FavoriteCities"
import FavCitiesModal from './components/FavCitiesModal'


const App = () => {
  const [isHamOpen, setISHamOpen] = useState(false)
  const [search, setSearch] = useState("chennai")
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const [days, setDays] = useState([])

  const [place, setPlace] = useState({
    city: "",
    state: "",
    country: "",
  })

  const [temp, setTemp] = useState({
    current: 0,
    min: 0,
    max: 0
  })

  const [weather, setWeather] = useState({
    title: "",
    desc: "",
    clouds: 0,
    windSpeed: 0,
    humidity: 0
  }
  )

  const [sun, setSun] = useState({
    rise: "",
    set: ""
  })

  const [currentDate, setCurrentDate] = useState("")

  // formatting time for sunrise and sunset

  function formatSunRiseOrSet(utcSeconds, zoneName) {

    const date = new Date(utcSeconds * 1000); // convert to ms
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
      timeZone: zoneName
    });
  }

  /* Blocking scroll when modal is open */

  useEffect(() => {
    if (isHamOpen || isSearchModalOpen) {
      document.body.classList.add("overflow-hidden")
    }
    else {
      document.body.classList.remove("overflow-hidden")
    }

  }, [isHamOpen, isSearchModalOpen])

  useEffect(() => {
    if (search.trim() === "") {
      return;
    }
    const APIKey = import.meta.env.VITE_WEATHER_API_KEY
    /* Getting the geolocation */
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=1&appid=${APIKey}`)
      .then((res) => res.json())
      .then((data) => {

        const lon = data[0].lon
        const lat = data[0].lat

        setPlace({
          city: data[0].name,
          state: data[0].state,
          country: data[0].country
        })

        /* getting the info's from weather api */

        const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}&units=metric`

        fetch(url)
          .then((res) => res.json())
          .then((data) => {
            const dateObj = new Date(data.list[0].dt * 1000)
            setCurrentDate(
              dateObj.toLocaleDateString('en-US', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                timeZone: 'UTC'
              })
            )

            //finding  the forecast for 5days

            const result = []
            for (let i = 0; i < data.list.length; i += 8) {
              const dateObj = new Date(data.list[i].dt * 1000)
              const day = dateObj.toLocaleDateString('en-US', {
                weekday: "long"
              })
              const dayShortName = day.slice(0, 3)
              result.push({ data: data.list[i], dayName: dayShortName })
            }
            setDays(result)

            setTemp({
              current: data.list[0].main.temp,
              min: data.list[0].main.temp_min,
              max: data.list[0].main.temp_max

            })

            setWeather({
              title: data.list[0].weather[0].main,
              desc: data.list[0].weather[0].description,
              windSpeed: data.list[0].wind.speed,
              clouds: data.list[0].clouds.all,
              humidity: data.list[0].main.humidity

            })

            //getting the timezone
            const timeZoneAPIKey = import.meta.env.VITE_TIME_ZONE_API_KEY;

            const timezoneURL = `http://api.timezonedb.com/v2.1/get-time-zone?key=${timeZoneAPIKey}&format=json&by=position&lat=${lat}&lng=${lon}`

            fetch(timezoneURL)
              .then(res => res.json())
              .then(Timedata =>
                setSun({
                  rise: formatSunRiseOrSet(data.city.sunrise, Timedata.zoneName),
                  set: formatSunRiseOrSet(data.city.sunset, Timedata.zoneName)
                })
              )
              .catch(err => console.error(err));

          })
          .catch((err) => console.error(err));

      })
      .catch((err) => console.error(err));


  }, [search])

  return (
    <>
      <section className={`lg:grid lg:grid-cols-[auto_320px] `}>

        < main className="" >
          <Header isHamOpen={isHamOpen} setISHamOpen={setISHamOpen} setSearch={setSearch} isSearchModalOpen={isSearchModalOpen} setIsSearchModalOpen={setIsSearchModalOpen} />

          {isSearchModalOpen && <SearchModal setIsSearchModalOpen={setIsSearchModalOpen} setSearch={setSearch} />}

          <CurrentWeather currentDate={currentDate} place={place} temp={temp} weather={weather} sun={sun} />

          <ForecaseCards weather={weather} temp={temp} days={days} />

          {
            isHamOpen && <FavCitiesModal setSearch={setSearch} isHamOpen={isHamOpen} setISHamOpen={setISHamOpen} />
          }

        </main >

        <aside className=" ">
          <FavoriteCities setSearch={setSearch} />
        </aside>
      </section >

    </>


  )
}

export default App
