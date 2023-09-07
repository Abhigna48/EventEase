import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios';
function Profile() {
  let [events,setUsers] = useState([]);
  let getusers=()=>{
    axios.get("http://localhost:4803/event-api/events")
    .then(response=>{
      if (response.status===200){
        setUsers(response.data)
      }
    }).catch()
  }
  useEffect(()=>{getusers()
  },[])
  return (
    <div className='mt-3'>
      <div className='text-center row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4'>
        {
          events.map(obj=><div key={obj.id}>
          <div className='card m-3 p-3 border-secondary bg-info' style={{"boxShadow":"1px 1px 4px black"}}>
            <div className='card-body'>
            <h6>Title:{obj.title}</h6>
            <h6>description:{obj.description}</h6>
            <button className='bg-white float-start p-1' style={{"border":"none","borderRadius":"4px"}}>Register</button>
            </div>
          </div>
          </div>
            )}
      </div>
      
      
    </div>
  )
}

export default Profile