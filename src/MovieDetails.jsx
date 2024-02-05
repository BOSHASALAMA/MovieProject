import axios from 'axios'
import React , {useState,useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
export default function MovieDetails() {
    const [moviedetails, setmovieDetails] = useState(null)

    async function movieDetails(id){
        let {data}=await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=2d5c3f1e24667af22ea6c950439322a0`)
        setmovieDetails(data)
    }
useEffect(() => {
movieDetails(params.id)
}, [])

    let params=useParams();
  return (
<>
<div>
    {moviedetails? <div className="row py-5">
    <div className='col-md-3'>
        <img className='w-100' src={'https://image.tmdb.org/t/p/w500'+moviedetails.poster_path} alt="" />
    </div>
    <div className='col-md-9'>
        <h2>{moviedetails.title}</h2>
        <p>{moviedetails.overview}</p>
        <ul >
        <div className='genres'>genres:{moviedetails.genres.map((gener)=><><span>{gener.name}</span></>)} </div>
        <li>budget: {moviedetails.budget}</li>
        <li>Popularity: {moviedetails.popularity}</li>
        <li>Vote-count: {moviedetails.vote_count}</li>
        <li>Vote: <i class="fa-solid fa-star vote"></i> {(moviedetails.vote_average).toString().slice(0,3)}</li>
        </ul>
    <button className='btn btn-warning '><Link to={`https://www.imdb.com/title/${moviedetails.imdb_id}/?ref_=vp_close`}target='blanc'>Watch Trailer</Link></button>
    </div>
    </div>:
  <div className='vh-100 d-flex justify-content-center align-items-center'>
    <i className='fas fa-spinner fa-spin fa-3x'></i>
  </div> }
   
</div>
</>
    )
}
{console.log(Math.trunc())}