import React from 'react'
import { useFormik  } from 'formik'
import * as Yup from 'yup'
import swal from 'sweetalert'
import { startUserLogin } from '../actions/userAction'
import '../Styling/register.css'

function Login(props) {
    const {handleToggle} = props
    const formik = useFormik({
        initialValues:{
            email:'',
            password:''
        },
        validationSchema:Yup.object({
            email:Yup.string().required().email(),
            password:Yup.string().required()
        }),
        onSubmit:function(values){
            const loggedin = () => {
                props.history.push('/home')
                swal({title:'Successfully logged in',icon:'success'})
                handleToggle(true)
            }
            startUserLogin(values,loggedin)
        }
    })
  return (
    <div className='register'>
        <h1>Login</h1>
        <form onSubmit={formik.handleSubmit}>
            <input  type="text"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    placeholder="Email"
            /><br/>
            {
                formik.touched.email && formik.errors.email && <span>{formik.errors.email}</span>
            }<br/>
            <input  type="password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    placeholder="Password"
            /><br/>
            {
                formik.touched.password && formik.errors.password && <span>{formik.errors.password}</span>
            }
            <br/>
            <input type = "submit" value="login" />
        </form>    
    </div>
  )
  
}

export default Login