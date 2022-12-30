import React from 'react'
import {  useSelector, useDispatch } from 'react-redux'
import { startDeleteUser } from '../actions/userAction'
import '../Styling/adminPage.css'
const UserTable = React.forwardRef((props,ref) => {
    const {showModal} = props
    const dispatch = useDispatch()
  
    const usersList = useSelector(state => state.users)
    const handleDelete = (id) => {
        const confirm = window.confirm('Are you Sure?')
        if(confirm)
        {
          dispatch(startDeleteUser(id))
        }
      }
    
  return (
    <div ref={ref} className="user-table">
     <h2>List of Users - {usersList.length} </h2>    
    <table>
    <thead>
      <tr>
        <th>S.No</th>
        <th>Name</th>
        <th>Mobile</th>
        <th>Email</th>
        <th>Image</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {
        usersList.map((ele,i)=>{
          return (
            <tr key={ele._id}>
              <td>{i+1}</td>
              <td>{ele.name}</td>
              <td>{ele.mobile}</td>
              <td>{ele.email}</td>
              <td><img src= {`http://localhost:3044/${ele.image}`} height="50px" alt={ele.name} /></td>
              <td>
                <button onClick={()=>{showModal(ele)}} className="edit-btn">edit</button>
                <button onClick={()=>{handleDelete(ele._id)}} className="delete-btn">delete</button>
              </td>
            </tr>
          )
        })
      }
    </tbody>
</table></div>
  )
})

export default UserTable