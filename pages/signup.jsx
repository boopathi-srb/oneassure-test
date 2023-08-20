import React, { useState } from 'react'; 
import {Security} from '../public/utils/hashPass';
import { useRouter } from 'next/router';
import styles from '../styles/SignInCard.module.css'
import Link from 'next/link';





function SignUpForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [error,setError] = useState("")
  const Router =  useRouter();
  const handleSignUp = () => {
    if(!!email && !!userName && !!password){
      if(password.length<6){
        setError("Password is not lengthy enough");
        return;
      }
      if( /^[a-zA-Z0-9.! #$%&'*+/=? ^_`{|}~-]+@[a-zA-Z0-9-]+(?:\. [a-zA-Z0-9-]+)*$/.test(
        email
      )){
        setError('Email is not valid');
        return;
      }
      if (!/^[a-zA-Z ]*$/.test(userName)) {
        setError('Username is not valid');
        return;
      }
      setError("");
      let userData = localStorage.getItem("user")
      userData = JSON.parse(userData || "[]")
      let user = {
        id:Math.random(),
        email:email,
        userName:userName,
        password:Security.encodeString(password),
        favs:[],
        cart:[]
      }
      //if different use, updating the users array and setting it in localstorage
      console.log(user,'user')
      userData.push(user)
      localStorage.setItem("user",JSON.stringify(userData))
      Router.push(`/signin`)
    }
    else{
      setError("Please fill all the fields");
      return;
    }
  };

  return (
    <div className={styles.window}>
    <div className={styles.card_wrapper}>
      <h2>Sign Up</h2>
      <input
        type="text"
        placeholder="User Name"
        name='username'
        value={userName}
        required
        onChange={(e) => setUserName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        name='email'
        required
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        required
        onChange={(e) => setPassword(e.target.value)}
      />
       <span className={styles.redirect}>
        Already an user? <Link href={'/signin'}>Sign in</Link>
      </span>
      <div className={styles.bottom}> 
        {
          !!error ?
          <span className={styles.error}>{error}</span>
          :
          <></>
        }
          <button onClick={handleSignUp} type='submit' >{"Sign Up"}</button>
      </div>
    </div>
    </div>
  );
}

export default SignUpForm;
