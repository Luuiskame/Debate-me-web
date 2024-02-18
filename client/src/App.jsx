
import {Routes, Route} from 'react-router-dom'
import {  useDispatch, useSelector } from 'react-redux'

//Importing components
import Login from './components/Login/Login'
import { useEffect } from 'react'

import { changeNameFunction } from './redux/user/userActions'

function App() {
  const user = useSelector(state=> state.user.name)
  const dispatch = useDispatch()

  useEffect(()=>{
      dispatch(changeNameFunction())
  },[])

  return (
    <main>

      <Routes>

        <Route path='/' element={<Login/>}/>

      </Routes>
      
    </main>
  )
}

export default App
