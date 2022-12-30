import swal from 'sweetalert'
import axios from 'axios'

export const startUserRegister = (data,redirect) => {
        axios.post('http://localhost:3044/api/user/register',data,
        {
            headers:{'Content-Type' : 'multipart/form-data'}
        }
        )
        .then((response)=>{
            const result = response.data
            if(result.hasOwnProperty('errors'))
            {
                swal({title:result.errors.message,icon:'error'})
            }
            else if(result.hasOwnProperty('email'))
            {
                swal({title:'Registered Sucsessfully',icon:'success'})
                redirect()
            }
            else if(result.hasOwnProperty('notice'))
            {
                swal({title:result.notice,icon:'warning'})
            }
            else
            {
                swal({title:'Error',icon:'error'})
            }
        })
        .catch((err)=>{
            alert(err.message)
        })
}

export const startUserLogin = (data,loggedIn) => {
    axios.post('http://localhost:3044/api/user/login',data)
    .then((response)=>{
        const result = response.data
        if(result.hasOwnProperty('errors'))
        {
            swal({title:result.errors.message,icon:'error'})
        }
        else if(result.hasOwnProperty('token'))
        {
            localStorage.setItem('token',result.token)
            loggedIn()
        }
        else
        {
            swal({title:'Error',icon:'error'})
        }
    })
    .catch((err)=>{
        alert(err.message)
    })
}

export const startGetProfile = () => {
    return (dispatch)=>{
        axios.get('http://localhost:3044/api/user/profile',{
        headers:{authorization:localStorage.getItem('token')}
    })
    .then((response)=>{
        const result = response.data
        if(result.hasOwnProperty('errors'))
        {
            swal({title:result.errors.message,icon:'error'})
        }
        else if(result.hasOwnProperty('notice'))
        {
            swal({title:result.notice,icon:'warning'})
        }
        else if(result.hasOwnProperty('role') && localStorage.getItem('token'))
        {
            dispatch(getProfile(result))
        }
        else
        {
            swal({title:'Error',icon:'error'})
        }
    })
    .catch((err)=>{
        alert(err.message)
    })
    }
}
const getProfile = (data) => {
    return {type:'PROFILE',payload:data}
}
export const startGetUsers = () => {
    return (dispatch)=>{
        axios.get('http://localhost:3044/api/user/list',{
        headers:{authorization:localStorage.getItem('token')}
    })
    .then((response)=>{
        const result = response.data

        if(result.hasOwnProperty('errors'))
        {
            swal({title:result.errors.message,icon:'error'})
        }
        else if(result.hasOwnProperty('notice'))
        {
            swal({title:result.notice,icon:'warning'})
        }
        else if(Array.isArray(result))
        {
            dispatch(getUsers(result))
        }
        else
        {
            swal({title:'Error',icon:'error'})
        }
    })
    .catch((err)=>{
        alert(err.message)
    })
    }
}
const getUsers = (data) => {
    return {type:'GET_USERS',payload:data}
}

export const startDeleteUser = (id) => {
    return (dispatch)=>{
        axios.delete(`http://localhost:3044/api/user/${id}`,{
        headers:{authorization:localStorage.getItem('token')}
    })
    .then((response)=>{
        const result = response.data
        if(result.hasOwnProperty('errors'))
        {
            swal({title:result.errors.message,icon:'error'})
        }
        else if(result.hasOwnProperty('notice'))
        {
            swal({title:result.notice,icon:'warning'})
        }
        else if(result.hasOwnProperty('email'))
        {
            dispatch(deleteUser(result))
        }
        else
        {
            swal({title:'Error',icon:'error'})
        }
    })
    .catch((err)=>{
        alert(err.message)
    })
    }
}

const deleteUser = (data) => {
    return {type:'DELETE_USER',payload:data}
}

export const startUpdateUser = (id, data, handleCancel) => {
    return (dispatch)=>{
        axios.put(`http://localhost:3044/api/user/${id}`,data,{
        headers:{authorization:localStorage.getItem('token')}
    })
    .then((response)=>{
        const result = response.data
        if(result.hasOwnProperty('errors'))
        {
            swal({title:result.errors.message,icon:'error'})
        }
        else if(result.hasOwnProperty('notice'))
        {
            swal({title:result.notice,icon:'warning'})
        }
        else if(result.hasOwnProperty('email'))
        {
            dispatch(updateUser(result))
            swal({title:'Successfully updated',icon:'success'})
            handleCancel()
        }
        else
        {
            swal({title:'Error',icon:'error'})
        }
    })
    .catch((err)=>{
        alert(err.message)
    })
    }
}

const updateUser = (data) =>{
    return {type:'UPDATE_USER',payload:data}
}

export const logout = () => {
    return {type:'LOGOUT'}
}