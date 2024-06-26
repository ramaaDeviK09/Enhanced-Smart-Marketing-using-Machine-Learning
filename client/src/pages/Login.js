import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import {Button} from 'react-bootstrap'
import './login.css'
import { useLoginMutation } from '../services/appApi';
export default function Login() {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [login, {error,isLoading,isError}] = useLoginMutation()
  const handleLogin = (e) => {
    e.preventDefault()
    login({email,password})
  }
  return (
    <>
    <div className="login">
        <form onSubmit={handleLogin}>
            { isError &&  <h2 className='danger'>{error.data}</h2> }
            <input type="text" placeholder='email' required onChange={(e) => setEmail(e.target.value)} value={email} />
            <input type="password" placeholder='password' required onChange={(e) => setPassword(e.target.value)} value={password}/>
            <Button type='submit' disabled={isLoading}>Login</Button>
            <Link to='/signup'>Don't have an account?Signup</Link>
        </form>
        <div className="loginimg"></div>
    </div>
    </>
  )
}
