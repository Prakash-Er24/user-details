import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startGetProfile } from '../actions/userAction'
import AdminPage from './AdminPage'
import UserPage from './UserPage'

function PageContainer() {
    const dispatch = useDispatch()
    const user = useSelector(state=>state.userProfile)
    useEffect(()=>{
        dispatch(startGetProfile())
    },[dispatch])
  
    return (
    <div>
        {
            user.role === 'admin' ? <AdminPage /> : <UserPage />
        }
    </div>
  )
}

export default PageContainer