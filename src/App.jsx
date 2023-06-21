import { useState,useRef } from 'react'
import './App.css'
import Search from './components/Search';
import Weather from './components/Weather';
import classnames from 'classnames';

function App() {
  //API 키를 환경변수로 불러오기
  const API_KEY = import.meta.env.VITE_API_KEY;
  const [location, setLocation] = useState(''); // 검색어
  const [weather, setWeather] = useState(null); // 날씨 데이터 null 값이 비었음을 명시적 선언
  const [error, setError] = useState(false);  //에러상태 true이면 에러
  const [weatherClass,setWeatherClass ]= useState('');

  console.log(API_KEY);

  // 날씨 요청 함수
  const fetchWeather = () => {
    
    const apiKey = API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&lang=kr`;

    //AJAX 요청
    fetch(url)
      .then(res => res.json())  // json포맷으로 변환
      .then(data => {
        //검색결과가 없을 때
        if(data.cod === '404'){
          setWeather(null)
          setError(true)
          return;
        }
        
        setError(false);
        setWeather(data);
        console.log(data);
        console.log("날씨: ",data.weather[0].main);
        //

        if(data.weather[0].main=='Clouds'){//구름
          setWeatherClass('clouds');
        }else if(data.weather[0].main=='Rain'){//비
          setWeatherClass('rain');
        }else if(data.weather[0].main=='Mist'){//안개
          setWeatherClass('mist');
        }
        

        

      })

      //에러처리
      .catch(() => {
        console.log('에러');
      })

      

  }

  //let weather_class = 'App';

  

  //입력함수
  const handleLocationChange = (e) => {    
    setLocation(e.target.value);
    console.log(e.target.value);
  }

  //검색 버튼 눌렀을 때
  const handleWeatherSearch = (e) => {
    //전송 이벤트 취소(기본 이벤트)
    e.preventDefault();

    console.log('검색 호출');
    //날씨 데이터 요청
    fetchWeather();
  }


  //classnames 모듈 사용하기
  /*
  이제 소개할 classnames 모듈은 여러 클래스를 추가할 때 뿐만 아니라, 
  특정 값이 true/false임에 따라 클래스명을 추가하거나, 
  추가하지 않도록 하는 것을 간단히 구현할 수 있게 해 줍니다.
  npm install classnames
  설명 url : https://chanhuiseok.github.io/posts/react-14/
  */

  return (
    <div className={classnames(weatherClass)}>
      <h1>Weather App</h1>
      <Search 
        handleWeatherSearch = {handleWeatherSearch}
        handleLocationChange = {handleLocationChange}
        location = {location}        
      />
      
      <Weather 
        weather = {weather}        
        error = {error}
      />
        
     
    </div>
  )
}

export default App
