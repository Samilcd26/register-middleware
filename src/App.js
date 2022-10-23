import React, { Component } from 'react'
import 'react-toastify/dist/ReactToastify.css';
import Register from "./components/Register"
import Login from "./components/Login"

export default class App extends Component {
  render() {
    return (
      <div>
        {/* <Register/> */}
        <Login />
      </div>
    )
  }
}
