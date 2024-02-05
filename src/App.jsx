import './App.css';
import React, { Component } from 'react'
import { Routes , Route, Navigate, useNavigate } from 'react-router-dom';
import { useState ,useEffect} from 'react';
import Navbar from './Navbar';
import Notfound from './Notfound';
import Movies from './Movies';
import People from './People'
import Home  from './Home';
import Tv from './Tv'
import Footer from './Footer'
import Login from './Login'
import Register from './Register'
import jwtDecode from 'jwt-decode'
import TvDetails from'./TvDetails';
import MovieDetails from './MovieDetails';
import PeopleDetails from './PeopleDetails';
function App() {
  let navigate=useNavigate()
  const [userData, setuserData] = useState(null)
  function saveUserData(){
    let encodedToken=localStorage.getItem("userToken")
    let decodedToken=jwtDecode(encodedToken)
    setuserData(decodedToken)
    console.log(decodedToken)
   }
   function logout(){
    setuserData(null)
    localStorage.removeItem("userToken")
    navigate('/login')
   }
useEffect(() => {
 if(localStorage.getItem("userToken")){
saveUserData()
 }
}, [])


   function ProtectedRoute(props){
    if(localStorage.getItem("userToken")===null){
  return <Navigate to='/login'/>
    }
    else{
return props.children;
    }
   }
    return (
      <div>
        <Navbar logout={logout} userData={userData}/>
        <div className="container">
        <Routes>
        <Route path="" element={<ProtectedRoute><Home/></ProtectedRoute> }/>
        <Route path="home" element={<ProtectedRoute><Home/></ProtectedRoute> }/>
        <Route path="movies" element={<ProtectedRoute><Movies/></ProtectedRoute>}/>
        <Route path="people" element={<ProtectedRoute><People/></ProtectedRoute>}/>
        <Route path="tv" element={<ProtectedRoute><Tv/></ProtectedRoute>}/>
        <Route path="movieDetails" element={<ProtectedRoute><MovieDetails/></ProtectedRoute>}>
        <Route path=":id" element={<ProtectedRoute><MovieDetails/></ProtectedRoute>}/>
        </Route>
        <Route path="tvDetails" element={<ProtectedRoute><TvDetails/></ProtectedRoute>}>
        <Route path=":id" element={<ProtectedRoute><TvDetails/></ProtectedRoute>}/>  
        </Route>
        <Route path="personDetails" element={<ProtectedRoute><PeopleDetails/></ProtectedRoute>}>
        <Route path=":id" element={<ProtectedRoute><PeopleDetails/></ProtectedRoute>}/>  
        </Route>
        <Route path="login" element={<Login saveUserData={saveUserData}/>}/>
        <Route path="register" element={<Register/>}/>
        <Route path="*" element={<Notfound/>}/>
        </Routes>
        </div>
        <Footer/>
      </div>
    )
  }



export default App;
