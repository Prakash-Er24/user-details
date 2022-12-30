import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Modal } from 'antd'
import { useReactToPrint } from 'react-to-print';
import { startGetUsers } from '../actions/userAction'
import Register from './Register'
import UserTable from './UserTable'
import '../Styling/adminPage.css'

function AdminPage() {
  const [editUser,setEditUser] = useState({})
  const [isModalOpen, setIsModalOpen] = useState(false);
  const componentRef= useRef()
  const dispatch = useDispatch()
  
  const user = useSelector(state=>state.userProfile)
  useEffect(()=>{
    dispatch(startGetUsers())
  },[dispatch])

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const showModal = (userData) => {
    setEditUser(userData)
    setIsModalOpen(true)
}

const handleCancel = () => {
  setIsModalOpen(false);
}

  return (
    <div className='admin-page'>
      <h1>Admin Page</h1>
      <span>Welcome - {user.name}</span>

      {
          <Modal title="Edit Expense" 
                open={isModalOpen} 
                onCancel={handleCancel} 
                okButtonProps={{style:{display:'none'}}}
                cancelButtonProps={{style:{backgroundColor:'#f44336',color:'white'}}}
      >
          <Register {...editUser} action='Update' handleCancel={handleCancel} />       
       </Modal>
      }
      <div className='download-user'>
        <button onClick={handlePrint} className="download-btn">Download</button>
        <UserTable showModal={showModal} ref={componentRef}/>
      </div>
      
    </div>
  )
}

export default AdminPage