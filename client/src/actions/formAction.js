import axios from 'axios'

export const startGetCountries = (getData) => {
    axios.get(`https://www.universal-tutorial.com/api/countries`,
        {headers:{
            "Authorization":localStorage.getItem('CountryToken'),
            "Accept": "application/json"
        }})
        .then((response)=>{
            getData(response.data,'countries')
        })
        .catch((err)=>{
            alert(err.message)
        })
}

export const startGetStates = (country, getData) => {
    axios.get(`https://www.universal-tutorial.com/api/states/${country}`,
    {headers:{
        "Authorization":localStorage.getItem('CountryToken'),
        "Accept": "application/json"
    }})
    .then((response)=>{
        getData(response.data,'states')
    })
    .catch((err)=>{
        alert(err.message)
    })
}

export const startGetCities = (state, getData) => {
    axios.get(`https://www.universal-tutorial.com/api/cities/${state}`,
    {headers:{
        "Authorization":localStorage.getItem('CountryToken'),
        "Accept": "application/json"
    }})
    .then((response)=>{
        getData(response.data,'cities')
    })
    .catch((err)=>{
        alert(err.message)
    })
}