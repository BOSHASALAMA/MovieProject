import axios from 'axios'
import React , {useState,useEffect} from 'react'
import { Link } from 'react-router-dom'

export default function Tv() {
  const [TrendingTv, setTrendingTv] = useState([])
  let nums = new Array(13).fill(1).map((ele,index)=>index+1)
  console.log(nums)
  async function GetTrending(pageNumber){
    let {data} = await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=2d5c3f1e24667af22ea6c950439322a0&include_adult=false&include_video=false&language=en-US%25sort_by%3Dpopularity.desc&page=${pageNumber}`)
    setTrendingTv(data.results.slice(0,10)) 
    }
    useEffect(() => {
      GetTrending(1)
  
      
    }, [])

  return (
<>
{TrendingTv?<div className="row pt-5 justify-content-center">
   
   {TrendingTv.map((tv,i)=><div key={i} className='col-md-2'>
     <div className="tv py-2">
       <Link to={`/tvDetails/${tv.id}`}>
       <img className='w-100' src={'https://image.tmdb.org/t/p/w500'+tv.poster_path} alt="" />
       <h3 className='h6 py-1'>{tv.name}</h3>
       </Link>

     </div>
   </div>)}
 </div>:<div className='vh-100 d-flex justify-content-center align-items-center'>
 <i className='fas fa-spinner fa-spin fa-3x'></i>
</div>}
<nav aria-label="..." className="py-5 d-flex justify-content-center">
  <ul className="pagination pagination-sm ">
    {nums.map((ele)=>    <li key={ele} onClick={()=>GetTrending(ele)} className="page-item"><a className="page-link bg-transparent text-white " >{ele}</a></li>
)}
  </ul>
</nav>
</>
    )
}
