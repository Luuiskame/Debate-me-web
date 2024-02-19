import React, { useEffect, useState } from "react";

import styles from "./signup.module.css";

//redux actions
import { createUser } from "../../redux/user/userActions";

import {useSelector, useDispatch} from 'react-redux'


function Signup() {
  const [isTaken, setIsTaken] = useState(true);
  const [isTheSamePassword, setIsTheSamePassword] = useState(null)
   
  const user = useSelector(state=> state.user)
  // console.log(user)
  const dispatch = useDispatch()

  const [userData, setUserData] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    profilePicture: 'sdfadf'
  })

  const handleChange = (event)=>{
    setUserData({
      ...userData,
      [event.target.name]: event.target.value
    })
    handlePasswordVerification(event)
  }

  const handleSubmit = (event)=>{
    event.preventDefault()
    console.log(userData)
    dispatch(createUser(userData))
  }

  const [twoPasswordsVerify, setTwoPasswordsVerify] = useState({
    repPassword: ''
  })



  const handlePasswordVerification = (event)=>{
    setTwoPasswordsVerify({
      ...twoPasswordsVerify,
      [event.target.name]: event.target.value
    })
  }

  useEffect(()=>{
    if(twoPasswordsVerify.repPassword !== userData.password){
      setIsTheSamePassword(true)
    } else {
      setIsTheSamePassword(false)
    }
  },[twoPasswordsVerify])

  return (
    <>
      <div className={styles.display}>
        <div className={styles.wrapper}>
          <h1 className={styles.header}>Create your account</h1>
          <p className={styles.text}>Create an account to chat and discuss interesting topics</p>
          <form className={styles.form} onSubmit={handleSubmit}>
            <label className={styles.titles} htmlFor="name">
              Full name
            </label>
            <input className={styles.inputs} 
            onChange={handleChange}
            id="name" 
            name="name"
            type="text" 
            required
            placeholder="introduce your name" />

            <label className={styles.titles} htmlFor="email">
              Email
            </label>
            <input className={styles.inputs}
            onChange={handleChange} 
            id="email" 
            name="email"
            type="email"
            autoComplete="email"
            required 
            placeholder="example@gmail.com" 
            />

            <label className={styles.titles} htmlFor="username">
              Username
            </label>
            <input className={styles.inputs} 
            onChange={handleChange}
            id="username" 
            name="username"
            type="text" 
            required
            placeholder="Pick an username" />
            <p className={isTaken ? styles.isUsed : styles.isNotUsed}>username already taken</p>
            <label className={styles.titles} htmlFor="password">
              Password
            </label>
            <input className={styles.inputs}
            onChange={handleChange}
            name="password" 
            id="password" 
            type="password" 
            required
            placeholder="Enter password" />

            <label className={styles.titles} htmlFor="">
              Confirm password
            </label>
            <input className={styles.inputs}
            name="repPassword"
            id="repPassword" 
            type="password" 
            onChange={handlePasswordVerification}
            required
            placeholder="Reapeat password" />
            {isTheSamePassword && <p>passwords aren't the same</p>}

            <button className={styles.submitBtn} type="submit">Create your account</button>
            <p className={styles.termsofservice}>
              By creating an account you agree to our <a href="#"> Terms of Service and Privacy Policy</a>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default Signup;
