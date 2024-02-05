import axios from 'axios'
import React , {useState,useEffect} from 'react'
import { Link,useParams } from 'react-router-dom'

export default function PeopleDetails() {
    const [peopledetails, setpeopleDetails] = useState(null)

    async function peopleDetails(id){
        let {data}=await axios.get(`https://api.themoviedb.org/3/person/${id}?api_key=2d5c3f1e24667af22ea6c950439322a0`)
        setpeopleDetails(data)
    }
useEffect(() => {
peopleDetails(params.id)
}, [])

    let params=useParams();
  return (
<>
<div>
    {peopledetails? <div className="row py-5">
    <div className='col-md-3'>
        <img className='w-100' src={'https://image.tmdb.org/t/p/w500'+peopledetails.profile_path} alt="" />
    </div>
    <div className='col-md-9'>
        <h2>{peopledetails.title}</h2>
        <p>{peopledetails.biography}</p>
        <ul >
        <li>birthday: {peopledetails.birthday}</li>
        <li>place-of-birth: {peopledetails.place_of_birth}</li>
        <li>known-for-department: {peopledetails.known_for_department}</li>
        <li>Popularity: {peopledetails.popularity}</li>
        </ul>
        <button className='btn btn-warning '><Link to={`https://www.imdb.com/name/${peopledetails.imdb_id}/`}target='blanc'>Know More</Link></button>

    </div>
    </div>:
  <div className='vh-100 d-flex justify-content-center align-items-center'>
    <i className='fas fa-spinner fa-spin fa-3x'></i>
  </div> }
   
</div>
</>
    )
}
