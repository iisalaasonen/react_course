import React from "react"
import PropTypes from "prop-types"

const LoginForm = ({ handleLogin, handleUsernameChange, handlePasswordChange, username, password }) => {
  const inputStyle = {
    margin: "1em"
  }
  const buttonStyle = {
    padding: "10px",
    backgroundColor: "#660000",
    color: "white",
    borderRadius: "10%"
  }
  return (
    <div>
      <h2>log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
            username
          <input id="username" style={inputStyle} type="text"
            value={username}
            name="Username"
            onChange={handleUsernameChange}/>
        </div>
        <div>
            password
          <input id="password" style={inputStyle} type="password"
            value={password}
            name="Password"
            onChange={handlePasswordChange}/>
        </div>
        <button id="login-button" style={buttonStyle} type="submit">login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm