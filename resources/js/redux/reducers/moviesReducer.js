import { movies, } from '../types'

const initState = {
  data: null,
  error: null,
  loading: false,
}

export default function moviesReducer (state = initState, action) {
  switch (action.type) {
    
    case movies.SEARCH_MOVIES_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    
    case movies.SEARCH_MOVIES_PENDING:
      return {
        ...state,
        loading: true,
      }
    
    case movies.SEARCH_MOVIES_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
      }

    default:
      return state
  }
}
