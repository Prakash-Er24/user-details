import {createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import usersReducer from '../reducers/usersReducer'
import userProfileReducer from '../reducers/userProfileReducer'

const configureStore = ( ) => {
    const store = createStore(combineReducers({
        users:usersReducer,
        userProfile : userProfileReducer
    }),applyMiddleware(thunk))
    return store
}

export default configureStore