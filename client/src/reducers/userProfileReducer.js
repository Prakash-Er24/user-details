const initialValue = {}

const userProfileReducer = (state = initialValue, action) => {

    switch(action.type){
        case 'PROFILE':{
            return {...action.payload}
        }
        case 'LOGOUT':{
            return {}
        }
        default:{
            return state
        }
    }
}
export default userProfileReducer