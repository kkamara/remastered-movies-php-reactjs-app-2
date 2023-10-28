import { combineReducers, } from 'redux'
import authReducer from './authReducer'
import usersReducer from './usersReducer'
import moviesReducer from './moviesReducer'

export default combineReducers({
  auth: authReducer,
  users: usersReducer,
  movies: moviesReducer,
})
