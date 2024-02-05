import React, { useState } from 'react';
import Axios from 'axios';
import joi from 'joi'
import {useNavigate} from 'react-router-dom'
export default function Register() {

let navigate= useNavigate()  
const [isload, setload] = useState(false)  
const [errorList, seterrorList] = useState([])
const [error, seterror] = useState("")  
const [user,setUser]=useState({
    first_name:'',
    last_name:'',
    age:0,
    email:'',
    password:''
  })
  function getUser(e){
let usser={...user}
usser[e.target.name]=e.target.value
setUser(usser)
  }
async function submitregisterform(e){
    e.preventDefault()
    setload(true)
    let validationResult=validateForm();
    if(validationResult.error){
seterrorList(validationResult.error.details)
setload(false)
    }
    else{
let {data} =await Axios.post("https://smart-app-c1zm.onrender.com/signup",user) 
if(data.message==="success"){
  navigate('/login')
setload(false)

}
else{
seterror(data.message)
setload(false)
console.log(user)
}
    }
}

function validateForm(){
  var sheme = joi.object({
    first_name:joi.string().alphanum().min(3).max(10).required(),
    last_name:joi.string().alphanum().min(3).max(10).required(),
    age:joi.number().min(18).max(80).required(),
    email:joi.string().email({minDomainSegments:2,tlds:{allow:['com','net']}}).required(),
    password:joi.string().pattern(new RegExp('^[A-Z][a-z]{3,10}$')).required(),
  });
  return sheme.validate(user,{abortEarly:false})
}
  return (
    <>
    <div className="w-75 mx-auto my-5">
    <h2>Register Now</h2>
<form action="" onSubmit={submitregisterform}>
{errorList.map((error,i)=>i===4?<div className='alert alert-danger ' id='alert'>{"password not valid"}</div>:<div className='alert alert-danger ' id='alert'>{error.message}</div>)}
  {error.length>0?  <div className='alert py-2 alert-danger ' id='alert'>{error}</div>:""}
<label htmlFor="first_name">First_Name:</label>
  <input onChange={getUser} className='form-control mb-2' id='first_name' type="text" name='first_name' />
  <label htmlFor="last_name">Last_Name:</label>
  <input onChange={getUser} className='form-control mb-2' id='last_name' type="text" name='last_name' />
  <label htmlFor="age">Age:</label>
  <input onChange={getUser} className='form-control mb-2' id='age' type="number" name='age' />
  <label htmlFor="email">Email:</label>
  <input onChange={getUser} className='form-control mb-2' id='email' type="email" name='email' />
  <label htmlFor="password">Password:</label>
  <input onChange={getUser} className='form-control mb-2' id='password' type="password" name='password' />
 <button className='btn btn-outline-warning' type='submit'>{isload===true ?<i className='fas fa-spinner fa-spin'></i>:"Register"}</button>
</form>
    </div>
    </>
  )
}
