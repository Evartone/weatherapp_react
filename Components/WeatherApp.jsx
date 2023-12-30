import React, { useState } from 'react';
import './WeatherApp.css'
import rain from "./imgs/rain.png"
import clear from "./imgs/clear.png"
import clouds from "./imgs/clouds.png"
import drizzle from "./imgs/drizzle.png"
import humidity from "./imgs/humidity.png"
import wind from "./imgs/wind.png"
import snow from "./imgs/snow.png"
import mist from "./imgs/mist.png"
import search from "./imgs/search.png"


const WeatherApp = () => {

    let api_key = "2af6784f7da81b03c4f391e62052bb21";
    //let aappi_key ="dd94f859a0e52d6e4767fddf735f04a7"

    const [changeIcon, setChangeIcon]= useState(clouds)

    const Seach = async ()=> {

        
            
        // Escvrever uma logica para pegar o a area do input

        const element = document.getElementsByClassName("city_Input")
        // Condição de verificação do input

        if(element[0].value==="" ) {
            return 0;
        }

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;
         
        let response = await fetch(url)

        // Transformar os dados em json
        let data = await response.json();
        const  humidity = document.getElementsByClassName("humidity_percentage")
        const  wind = document.getElementsByClassName("wind_rate")
        const temperature = document.getElementsByClassName("weather_temp")
        const location = document.getElementsByClassName("weather_location")

        //

        humidity[0].innerHTML= data.main.humidity+"%";
        wind[0].innerHTML=Math.floor(data.wind.speed) +"km/h";
        temperature[0].innerHTML=Math.floor(data.main.temp)+"°C";
        location[0].innerHTML = data.name; 


        if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n") {

            setChangeIcon(clear);
        } else if (data.weather[0].icon === "02d" || data.weather[0].icon === "02n") {

            setChangeIcon(clouds);

        }else if (data.weather[0].icon === "03d" || data.weather[0].icon === "03n") {

            setChangeIcon(clouds)
        } else if (data.weather[0].icon === "04d" || data.weather[0].icon === "04n") {
            setChangeIcon(drizzle)

        } else if  (data.weather[0].icon === "09d" || data.weather[0].icon === "09n"){
            setChangeIcon(rain)
        }else if   (data.weather[0].icon === "10d" || data.weather[0].icon === "10n") {
            setChangeIcon(rain)

        }else if (data.weather[0].icon === "13d" || data.weather[0].icon === "13n "){

            setChangeIcon(snow);

        }else if (data.weather[0].icon === "50d" || data.weather[0].icon === "50n "){

            setChangeIcon(mist);}
        
        
        else {
            setChangeIcon(clear);

        }

    }

    
  return (

    <div className='container'>

        <div className='top_bar'>

            <input type="text" className='city_Input' placeholder='Search'/>

            <div className='search' onClick={()=>{Seach()}}> 

                <img className='icon_serch' src={search}/> 
            
            </div>
        </div>

        <div className='weather_images'>
           
          <img src={changeIcon} />

        </div>

        <div className='weather_temp'>19º</div>
        <div className='weather_location'>Luanda</div>

        <div className='data_container'>
            
           <div className='element'>
            
              <img src={humidity} className='image_icon' />

                <div className='data_element'>

                  <div className='humidity_percentage'>77%</div>
                  <div className='text'>Humididty</div>
                  
                </div>
           
            </div>


           <div className='element'>
            
                 <img src={wind} className="image_icon" />

               <div className='data_element'>

                   <div className='wind_rate'>12 km/h</div>
                   <div className='text'>Wind-speed</div>

              </div>
           </div>
      
       </div>
          
      
    </div>
  )
}

export default WeatherApp;
