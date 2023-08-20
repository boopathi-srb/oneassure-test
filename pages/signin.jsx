import React, { useState } from 'react';
import styles from '../styles/SignInCard.module.css'
import { useRouter } from 'next/router';
import Link from 'next/link';
import {Security} from '../public/utils/hashPass';
import moment from 'moment/moment';


function SignInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error,setError] = useState("")
  const [remember, setRemember] = useState(false)
  const Router =  useRouter();

  const handleSignIn = () => {
    if(!email && !password){
      setError("Please fill all the fields");
      return;
    }
    let userData=localStorage.getItem("user") || "[]"
    userData=JSON.parse(userData)
    console.log(userData)
    if(!!userData && userData.some((users)=>users.email===email)){
      let userData1 = userData.find((users)=>users.email===email)
      if(Security.decodeString(userData1.password)===password){
        sessionStorage.setItem('isLoggedIn',true);
        sessionStorage.setItem("userId",userData1.id)
        localStorage.setItem('remember', remember)
        if(remember){
          //if remember sign in adding token both inj local and session
          localStorage.setItem("token",Security.encodeString(Math.random().toString()+moment().add(2,'days').format("-HH:mm:ss")));
          sessionStorage.setItem("token",Security.encodeString(Math.random().toString()+moment().add(2,'days').format("-HH:mm:ss")))
        }
        else{
           //if not remember sign in adding token in session
          sessionStorage.setItem("token",Security.encodeString(Math.random().toString()+moment().add(2,'days').format("-HH:mm:ss")))
        }
        setError("")
        Router.push('/')
      }
      else{
        setError("Password / Email is not valid")
      }
    }
    else{
      setError("User not found")
    } 
  };

  return (
    <div className={styles.window}>
    <div className={styles.card_wrapper}>
      <h2>Sign In</h2>
      <input
        type="email"
        placeholder="Email"
        name='email'
        value={email}
        required
        onChange={(e) => {setEmail(e.target.value); !!error&&setError("")}}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        required
        onChange={(e) => {setPassword(e.target.value); !!error&&setError("")}}
      />
      <div className={styles.remember}>
        <input aria-label='Remember me' type='checkbox' onChange={(e)=>setRemember(e.target.checked)}/>
        <label>Remember me</label>
      </div>
      <span className={styles.redirect}>
        New user? <Link href={'/signup'}>Sign up</Link>
      </span>
      <div className={styles.bottom}> 
        {
          !!error ?
          <span className={styles.error}>{error}</span>
          :
          <></>
        }
          <button onClick={handleSignIn} type='submit' >{"Sign In"}</button>
      </div>
      
    </div>
    </div>
  );
}

export default SignInForm;
