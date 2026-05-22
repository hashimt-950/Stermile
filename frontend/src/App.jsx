import './App.css'
import Private from './components/Private'
import authService from './appwrite/auth'
import { useState, useEffect } from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Auth from './components/Auth'
import Login from './components/Login-Signup/Login'
import Signup from './components/Login-Signup/Signup'
import Protected from './components/Protected'
import Home from './components/Home'
import Watchlist from './components/Watchlist'
import { homeLoader } from './loaders/homeLoader';
import getWatchlist from './loaders/watchlistLoader'
import Search from './Search'
import { redirectIfAuthed, requireAuth } from './loaders/authLoader'
import { ToastContainer } from 'react-toastify'

function App() {

  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    authService.GetCurrentUser()
      .then((userData) => {
        setUser(userData)
      })
      .catch(() => {
        setUser(null)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])


    if(loading === true){
      return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
          <div className="spinner-border text-secondary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )
    }


    const router = createBrowserRouter(
      createRoutesFromElements(
        <>
          <Route path='/' element={<Auth />} loader={redirectIfAuthed}>
              <Route index element={<Login setUser={setUser} />} />
              <Route path='/login' element={<Login setUser={setUser} />} />
              <Route path='/signup' element={<Signup setUser={setUser} />}/>
          </Route>

          <Route loader={requireAuth} path='/dashboard' element={
            <Protected user={user} loading={loading}>
              <Private setUser = {setUser} />
            </Protected>
          }>

            <Route loader={homeLoader} index element={<Home />} />
            <Route loader={homeLoader} path='home' element={<Home />} />
            <Route loader={getWatchlist} path='watchlist' element={<Watchlist />} />
            <Route path='search' element={<Search />} />
            {/* <Route path='friends' element={<Friends />} /> */}
          </Route>

        </>   
      )
    )

    return (
      <>
        <ToastContainer position='top-center' autoClose={2000} theme='dark'/>
        <RouterProvider router={router}/>
      </>

    )
}

export default App
