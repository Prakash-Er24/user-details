import React from 'react'
import { useSelector } from 'react-redux'
import '../Styling/userprofile.css'

function UserPage() {
    const user = useSelector(state=>state.userProfile)
  return (
    <div className='user-profile'>
        {Object.keys(user).length>0 && <><h1>Welcome - {user.name} </h1>
        <img src= {`http://localhost:3044/${user.image}`} alt="pic" />
        <p>Email - {user.email}</p>
        <p>Mobile - {user.mobile}</p>
        <p>Country - {user.country}</p>
        <p>State - {user.state}</p>
        <p>City - {user.city}</p>
        <p>Description - {user.description}</p>
        </>}
    </div>
  )
}

export default UserPage