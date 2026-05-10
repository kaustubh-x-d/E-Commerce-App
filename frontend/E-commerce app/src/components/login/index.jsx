import {useState} from 'react'
import {useNavigate, Navigate} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showSubmitError, setShowSubmitError] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const navigate = useNavigate()
  
  const onChangeUsername = event => {
    setUsername(event.target.value)
  }

  const onChangePassword = event => {
    setPassword(event.target.value)
  }

  const showErrormsg = error => {
    setShowSubmitError(true)
    setErrorMsg(error)
  }

  const submitForm = async event => {
    event.preventDefault()

    const userDetails = {username, password}
    const url = 'http://127.0.0.1:5000/login'
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userDetails),
    }

    try {
      const response = await fetch(url, options)
      const data = await response.json()

      if (response.ok) {
        Cookies.set('jwt_token', data.jwt_token, {expires: 30})
        navigate('/', {replace: true})
      } else {
        showErrormsg(data.message)
      }
    } catch (error) {
      showErrormsg('Network error. Please try again.')
    }
  }

  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken !== undefined) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="login-form-container">
      <img
        src="https://i.postimg.cc/nrH9PN32/Chat-GPT-Image-May-10-2026-02-33-55-PM.png"
        className="login-website-logo-mobile-img"
        alt="website logo"
      />

      <img
        src="https://i.postimg.cc/nrH9PN32/Chat-GPT-Image-May-10-2026-02-33-55-PM.png"
        className="login-img"
        alt="website login"
      />

      <form className="form-container" onSubmit={submitForm}>
        <img
          src="https://i.postimg.cc/brX3SYNf/Chat-GPT-Image-May-10-2026-02-29-38-PM.png"
          className="login-website-logo-desktop-img"
          alt="website logo"
        />

        <div className="input-container">
          <label className="input-label" htmlFor="username">
            USERNAME
          </label>
          <input
            type="text"
            id="username"
            className="username-input-field"
            value={username}
            onChange={onChangeUsername}
            placeholder="Username"
          />
        </div>

        <div className="input-container">
          <label className="input-label" htmlFor="password">
            PASSWORD
          </label>
          <input
            type="password"
            id="password"
            className="password-input-field"
            value={password}
            onChange={onChangePassword}
            placeholder="Password"
          />
        </div>

        <button type="submit" className="login-button">
          Login
        </button>

        {showSubmitError && <p className="error-message">*{errorMsg}</p>}
      </form>
    </div>
  )
}

export default LoginForm