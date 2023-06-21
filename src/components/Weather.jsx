import React from 'react'

function Weather(props) {

    const { weather , error } = props;

  return (
    <>
        {
             //비동기로 값을 받아오기 응답 속도에 따라 weather 값이 있으면 처리
          weather && (
            <div className='weather'>
            <h2>{weather.name}</h2>
            <span style={{'fontSize':'30px'}}>{(weather.main.temp-273.15).toFixed(1)}°C  / </span>
            <span style={{'fontSize':'20px'}}>{weather.weather[0].description}</span>
            </div>
          )
        }
        
        {
          error && (
            <p style={{'color':'red', 'fontWeight':'bold'}}>올바른 지역이 아닙니다.</p>
          )
        }
    </>
  )
  
}

export default Weather