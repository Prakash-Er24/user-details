import React,{useEffect, useState} from 'react'
import { useDispatch } from 'react-redux'
import validator from 'validator'
import { startGetCountries, startGetStates, startGetCities } from '../actions/formAction'
import { startUpdateUser, startUserRegister } from '../actions/userAction'
import '../Styling/register.css'

function Register(props) {
    const {_id,name:Name,email:Email,mobile:Mobile,country:Country,
        state:State,city:City,description:Desc,action,handleCancel} = props
    const [name,setName] = useState( '' )
    const [email,setEmail] = useState('')
    const [mobile,setMobile] = useState('')
    const [country,setCountry] = useState('')
    const [state, setState] = useState('')
    const [city,setCity] = useState('')
    const [password,setPassword] = useState('')
    const [image,setImage] = useState('')
    const [description,setDescription] = useState('')
    
    const [countries,setCountries] = useState([])
    const [states,setStates] = useState([])
    const [cities,setCities] = useState([])

    const [error,setError] = useState({})
    const errors = {}

    const dispatch = useDispatch()

    const getData = (data,type) => {
        if(type==='countries')
        {
            setCountries(data)
        }
        else if(type==='states')
        {
            setStates(data)
        }
        else if(type==='cities')
        {
            setCities(data)
        }
    }
    
    useEffect(()=>{
        startGetCountries(getData)
    },[])

    useEffect(()=>{
        setName(Name||'')
        setEmail(Email ||'')
        setMobile(Mobile||'')
        setCountry(Country||'')
        setState(State||'')
        setCity(City||'')
        setDescription(Desc||'')
    },[Name,Email,Mobile,Country,State,City,Desc])

    useEffect(()=>{
      country &&  startGetStates(country,getData)
      if(!action)
      {
          setStates([])
          setCities([])
          setState('')
          setCity('')
      }
    },[country])

    useEffect(()=>{
       state && startGetCities(state,getData)
    },[state])

    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        if(name==='name')
        {
            setName(value)
        }
        else if(name==='email')
        {
            setEmail(value)
        }
        else if(name==='password')
        {
            setPassword(value)
        }
        else if(name==='mobile')
        {
            setMobile(value)
        }
        else if(name==='country')
        {
            setCountry(value)
        }
        else if(name==='state')
        {
            setState(value)
        }
        else if(name==='city')
        {
            setCity(value)
        }
        else if(name==='description')
        {
            setDescription(value)
        }
        else if(name==='image')
        {
            setImage(e.target.files[0])
        }
    }

    const validate = () => {
        if(name.length===0)
        {
            errors.name = 'Name is required'
        }
        if(email.length===0)
        {
            errors.email = 'email is required'
        }
        else if(!validator.isEmail(email))
        {
            errors.email = 'invalid email format'
        }
        if(password.length===0 && !action)
        {
            errors.password = 'Password is required'
        }
        else if(password.length<8 && !action)
        {
            errors.password = "Password should contain minimum 8 characters"
        }
        if(mobile.length === 0)
        {
            errors.mobile = 'Mobile is required'
        }
        else if(!validator.isNumeric(mobile))
        {
            errors.mobile = 'Mobile must be a Number'
        }
        else if(mobile.length!==10)
        {
            errors.mobile = 'Mobile should contain 10 numbers'
        }
        if(country.length===0)
        {
            errors.country = 'Select Country'
        }
        if(state.length === 0)
        {
            errors.state = 'Select state'
        }
        // if(city.length === 0)
        // {
        //     errors.city = 'Select city'
        // }
        if(!image && !action){
            errors.image = 'Select image'
        }
        setError(errors)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        validate()
        const redirect = () => {
            if(!action){
                props.history.push('/login')
            }
            setName('')
            setEmail('')
            setPassword('')
            setMobile('')
            setCountry('')
            setState('')
            setCity('')
            setImage('')
            setDescription('')
        }
        if(Object.keys(errors).length === 0 && !action)
        {
            const formData = {name,email,password,mobile,country,state,city,image,description}
            startUserRegister(formData,redirect)
        }
        else if(Object.keys(errors).length === 0 && action==='Update')
        {
            const formData = {name,email,password,mobile,country,state,city,description}
            dispatch(startUpdateUser(_id,formData,handleCancel))
        }
    }
    
  return (
    <div className='register'>
        {
            !action && <h2>Register</h2>
        }
        <form onSubmit={handleSubmit}>
            <input  type="text"
                    name="name"
                    value={name}
                    onChange={handleChange}
                    placeholder="Name"
            /><br/>
            {error.name && <span>{error.name}</span>}
            <br/>

            <input  type="text"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    placeholder="Email"
            /><br/>
           {error.email && <span>{error.email}</span>}
            <br/>

           {!action && <><input  type="password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                    placeholder="Password"
            /><br/>
            {error.password && <span>{error.password}</span>}
           <br/>
            </>
            }
          
            <input  type="text"
                    name="mobile"
                    value={mobile}
                    onChange={handleChange}
                    placeholder="Mobile"
            /><br/>
            {error.mobile && <span>{error.mobile}</span>}
            <br/>

            <select onChange={handleChange} value={country} name="country" >
                <option value="">Select country</option>
                {
                    countries.map(ele=>{
                        return <option key={ele.country_name} value={ele.country_name} >{ele.country_name}</option>
                    })
                }
            </select><br/>
            {error.country && <span>{error.country}</span>}<br/>
            
            <select onChange={handleChange} name="state" value={state}>
                <option value="">Select State</option>
                {
                    states.map(ele=>{
                        return <option key={ele.state_name} value={ele.state_name}>{ele.state_name}</option>
                    })
                }
            </select><br/>
            {error.state && <span>{error.state}</span>}<br/>

            <select onChange={handleChange} name="city" value={city}>
                <option value="">Select City</option>
                {
                    cities.map(ele=>{
                        return <option key={ele.city_name} value={ele.city_name}>{ele.city_name}</option>
                    })
                }
            </select><br/>
            {/* {error.city && <span>{error.city}</span>} */}
            <br/>

            {!action && <><input  type="file"
                    name="image"
                    onChange={handleChange}
            /><br/>
            {error.image && <span>{error.image}</span>}<br/>
            </>}
            
            <textarea value={description} 
                      name="description"  
                      onChange={handleChange} 
                      placeholder="Description"
            ></textarea><br/><br/>
            <input type = "submit" value={action?action:'Register'} />
        </form>    
    </div>
  )
}

export default Register