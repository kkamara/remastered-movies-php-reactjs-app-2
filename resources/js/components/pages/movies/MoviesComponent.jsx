import React, { useEffect, useState } from 'react'
import { useNavigate, } from 'react-router-dom'
import { useDispatch, useSelector, } from 'react-redux'
import { authorize } from '../../../redux/actions/authActions'
import { searchMovies } from '../../../redux/actions/moviesActions'

import "./MoviesComponent.scss"

export default function MoviesComponent() {
  const [query, setQuery] = useState("")
  const navigate = useNavigate()

  const dispatch = useDispatch()
  const state = useSelector(state => ({
    auth: state.auth,
    movies: state.movies
  }))

  useEffect(() => {
    dispatch(authorize())
  }, [])

  useEffect(() => {
    if (state.auth.error) {
      localStorage.removeItem('user-token')
      window.location.href = '/user/login'
    }
  }, [state.auth,])

  if (!state.auth.loading && typeof state.auth.data === 'object' && null !== state.auth.data) {
    console.log('authenticated', state.auth.data)
  }
  if (state.auth.loading || state.movies.loading) {
    return <p>Loading...</p>
  }

  return (
    <>
      <div className='container'>
        <br />
        <br />
        <button className='btn btn-primary'>
          Test button
        </button>        
      </div>
    </>       
  )
}
