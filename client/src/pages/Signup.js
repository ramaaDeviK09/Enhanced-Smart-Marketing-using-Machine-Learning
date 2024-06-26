import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import './signup.css'
import {Button} from 'react-bootstrap'
import { useSignupMutation } from '../services/appApi';
export default function Signup() {
  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [signup, {error,isLoading,isError}] = useSignupMutation()
  const handleSignUp = (e) => {
    e.preventDefault()
    signup({name,email,password})
  }
  return (
    <>
      <div className="signup">
        <form onSubmit={handleSignUp}>
            { isError &&  <h2 className='danger'>{error.data}</h2> }
            <input type="text" placeholder='name' required onChange={(e) => setName(e.target.value)} value={name} />
            <input type="text" placeholder='email' required onChange={(e) => setEmail(e.target.value)} value={email} />
            <input type="password" placeholder='password' required onChange={(e) => setPassword(e.target.value)} value={password}/>
            <Button type='submit' disabled={isLoading}>Login</Button>
            <Link to='/login'>Already have an account?Login</Link>
        </form>
        <div className="signupimg"></div>
    </div>
    </>
  )
}
