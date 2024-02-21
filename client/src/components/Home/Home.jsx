import React from 'react'

import io from 'socket.io-client'
const socket = io.connect("http://localhost:3001")

const Home = ()=> {
  return (
    <div>Home</div>
  )
}

export default Home
