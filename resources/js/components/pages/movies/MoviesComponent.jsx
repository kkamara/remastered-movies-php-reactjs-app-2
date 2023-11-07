import React, { useEffect, useState } from 'react'
import { useNavigate, } from 'react-router-dom'
import { useDispatch, useSelector, } from 'react-redux'
import { authorize } from '../../../redux/actions/authActions'
import { searchMovies } from '../../../redux/actions/moviesActions'
import { PhotoView } from 'react-image-previewer'

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

  const handleQueryChange = (e) => {
    setQuery(e.target.value)
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()

    dispatch(searchMovies(query))
  }

  const renderData = () => {
    if (!state.movies.data) {
      return null
    }
    const movies = state.movies
      .data
      .Search
      .map(({
        Poster,
        Title,
        Year,
        Type,
        imdbID
      }, index) => (
        <div className="col-md-2">
          <div className="card" key={index}>
            <div className="card-header">
              <PhotoView src={Poster}>
                <img className="img-responsive poster" src={Poster} alt="" />
              </PhotoView>
              <br />
              {Title} ({Year})
            </div>
          </div>
        </div>
      ))
    return <div className="container">
      <div className="row">
        {movies}
      </div>
    </div>
  }

  if (!state.auth.loading && typeof state.auth.data === 'object' && null !== state.auth.data) {
    console.log('authenticated', state.auth.data)
  }
  if (state.movies.data) {
    console.log('movies data', state.movies.data)
  }
  if (state.auth.loading || state.movies.loading) {
    return <p>Loading...</p>
  }

  return (
    <>
      <div className='container movies-container'>
        <br />
        <br />
        <div className="row">
          <div className="col-md-6 offset-md-3">
            {state.movies.error ? <div class="alert alert-danger alert-dismissible fade show" role="alert">
                {state.movies.error.message || state.movies.error}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
              </div> : null}
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <form 
              className="form"
              method="get" 
              onSubmit={handleOnSubmit}
            >
              <div className="form-group">
                <label htmlFor="query" className='p-2'>Query</label>
                <input 
                  type="text"
                  name="query"
                  className="form-control"
                  placeholder="Avengers"
                  value={query}
                  onChange={handleQueryChange}
                />
              </div>
              <div className="form-group p-2">
                <input 
                  type="submit"
                  value="Search..."
                  className="btn btn-lg btn-success"
                />
              </div>
            </form>
          </div>
        </div>
        {renderData()}
      </div>
    </>       
  )
}
