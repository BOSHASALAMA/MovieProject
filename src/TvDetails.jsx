import axios from 'axios'
import React , {useState,useEffect} from 'react'
import { Link,useParams } from 'react-router-dom'

export default function TvDetails() {
    const [tvdetails, settvDetails] = useState(null)

    async function tvDetails(id){
        let {data}=await axios.get(`https://api.themoviedb.org/3/tv/${id}?api_key=2d5c3f1e24667af22ea6c950439322a0`)
        settvDetails(data)
    }
useEffect(() => {
tvDetails(params.id)
}, [])

    let params=useParams();
  return (
<>
<div>
    {tvdetails? <div className="row py-5">
    <div className='col-md-3'>
        <img className='w-100' src={'https://image.tmdb.org/t/p/w500'+tvdetails.poster_path} alt="" />
    </div>
    <div className='col-md-9'>
        <h2>{tvdetails.title}</h2>
        <p>{tvdetails.overview}</p>
        <ul >
        <li>name: {tvdetails.name}</li>
        <li>Type: {tvdetails.type}</li>
        <li>Popularity: {tvdetails.popularity}</li>
        <li>Vote-count: {tvdetails.vote_count}</li>
        <li>Vote: <i class="fa-solid fa-star vote"></i> {(tvdetails.vote_average).toString().slice(0,3)}</li>
        </ul>
        <button className='btn btn-warning '><Link to={`${tvdetails.homepage}`}target='blanc'>More</Link></button>

    </div>
    </div>:
  <div className='vh-100 d-flex justify-content-center align-items-center'>
    <i className='fas fa-spinner fa-spin fa-3x'></i>
  </div> }
   
</div>
</>
    )
}

