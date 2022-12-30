const initialValue = []

const usersReducer = (state = initialValue, action) => {
    switch(action.type){
        case 'GET_USERS':{
            return [...action.payload]
        }
        case 'DELETE_USER':{
            const result = state.filter(ele=>ele._id!==action.payload._id)
            return result
        }
        case 'UPDATE_USER':{
            const result = state.map(ele=>{
                if(ele._id===action.payload._id)
                {
                    return {...ele,...action.payload}
                }
                else
                {
                    return {...ele}
                }
            })
            return result
        }
        case 'LOGOUT':{
            return []
        }
        default:{
            return state
        }
    }
}
export default usersReducer