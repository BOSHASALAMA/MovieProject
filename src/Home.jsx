import axios from 'axios'
import React , {useState,useEffect} from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  const [TrendingMovies, setTrendingMovies] = useState([])
  const [Trendingtv, setTrendingtv] = useState([])
  const [Trendingpeople, setTrendingpeople] = useState([])

 async function GetTrending(sort , callback){
let {data} = await axios.get(`https://api.themoviedb.org/3/trending/${sort}/week?api_key=2d5c3f1e24667af22ea6c950439322a0`)
callback(data.results.slice(0,10)) 
}
useEffect(() => {
  GetTrending("movie",setTrendingMovies)
  GetTrending("tv",setTrendingtv)
  GetTrending("person",setTrendingpeople)
  
}, [])


return (
  <>
  <div className="row pt-5">
    <div className='col-md-4 d-flex align-items-center'>
    <div>
    <div className='brdr w-25 mb-4'></div>
    <h2 className='h3'>Trending <br/>Movies <br/> To Watch Right Now</h2>
    <p className='muted'>Top Trending Movies By Day</p>
    <div className='brdr mt-4'></div>
    </div>
    </div>
    {TrendingMovies.map((movie,i)=><div key={i} className='col-md-2'>
      <div className="movie py-2">
        <Link to={`/movieDetails/${movie.id}`}>
        <img className='w-100' src={'https://image.tmdb.org/t/p/w500'+movie.poster_path} alt="" />
        <h3 className='h6 py-1'>{movie.title}</h3>
        </Link>
 
      </div>
    </div>)}
  </div>
  <div className="row py-5">
    <div className='col-md-4 d-flex align-items-center'>
    <div>
    <div className='brdr w-25 mb-4'></div>
    <h2 className='h3'>Trending <br/>Tv <br/> To Watch Right Now</h2>
    <p className='muted'>Top Trending Tv By Day</p>
    <div className='brdr mt-4'></div>
    </div>
    </div>
    {Trendingtv.map((tv,i)=><div key={i} className='col-md-2'>
      <div className="tv py-2">
      <Link to={`/tvDetails/${tv.id}`}>
        <img className='w-100' src={'https://image.tmdb.org/t/p/w500'+tv.poster_path} alt="" />
        <h3 className='h6 py-1'>{tv.name}</h3>
        </Link>
      </div>
    </div>)}
  </div>
  <div className="row py-5">
    <div className='col-md-4 d-flex align-items-center'>
    <div>
    <div className='brdr w-25 mb-4'></div>
    <h2 className='h3'>Trending <br/>People <br/> To Watch Right Now</h2>
    <p className='muted'>Top Trending People By Day</p>
    <div className='brdr mt-4'></div>
    </div>
    </div>
    {Trendingpeople.map((person,i)=><div key={i} className='col-md-2'>
      <div className="tv py-2">
      <Link to={`/personDetails/${person.id}`}>
        <img className='w-100' src={'https://image.tmdb.org/t/p/w500'+person.profile_path} alt="" />
        <h3 className='h6 py-1'>{person.name}</h3>
        </Link>
      </div>
    </div>)}
  </div>
  </>
  )
}
