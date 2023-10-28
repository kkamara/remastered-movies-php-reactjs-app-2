
import HttpService from '../../services/HttpService'
import { movies, } from '../types'

export const searchMovies = query => {
  return async dispatch => {
    const http = new HttpService()
        
    dispatch({ type: movies.SEARCH_MOVIES_PENDING, })

    const tokenId = "user-token"
    const path = 'v1/search/?query='+query
    await new Promise((resolve, reject) => {
      http.getData(http.domain+'/sanctum/csrf-cookie').then( 
        http.getData(path, tokenId).then(res => {
          resolve(dispatch({
            type: movies.SEARCH_MOVIES_SUCCESS,
            payload: res.data.data,
          }))                
        }, error => {
          reject(dispatch({ 
            type : movies.SEARCH_MOVIES_ERROR, 
            payload: error,
          }))
        })
      ).catch(error => {
        reject(dispatch({ 
          type : movies.SEARCH_MOVIES_ERROR, 
          payload: error,
        }))
      })
    })
  }
}
