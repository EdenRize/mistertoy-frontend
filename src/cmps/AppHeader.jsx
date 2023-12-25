import { UserMsg } from './UserMsg.jsx'
import { LoginSignup } from './LoginSignup.jsx'
import { SET_USER } from '../store/reducers/user.reducer.js'
import { logout } from '../store/actions/user.actions.js'
import { showErrorMsgRedux } from '../store/actions/app.actions.js'

import { useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'

export function AppHeader() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((storeState) => storeState.userModule.loggedinUser)

  function onLogout() {
    logout()
      .then(() => {
        onSetUser(null)
      })
      .catch((err) => {
        showErrorMsgRedux('Oops try again')
      })
  }

  function onSetUser(user) {
    dispatch({ type: SET_USER, user })
    navigate('/')
  }

  return (
    <header className="main-layout full app-header ">
      <section className="header-container">
        <h1>Toys App</h1>
        <nav className="app-nav">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/toy">Toys</NavLink>
        </nav>
      </section>
      {user ? (
        <section>
          <span to={`/user/${user._id}`}>
            Hello {user.fullname}
          </span>
          <button onClick={onLogout}>Logout</button>
        </section>
      ) : (
        <section>
          <LoginSignup onSetUser={onSetUser} />
        </section>
      )}
      <UserMsg />
    </header>
  )
}
