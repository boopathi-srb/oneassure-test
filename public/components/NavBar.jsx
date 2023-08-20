import React, { useEffect, useState } from 'react';
import styles from '../../styles/Navbar.module.css';
import { useRouter } from 'next/router';
import moment from 'moment/moment';
import { Security } from '../utils/hashPass';
const Navbar = () => {
  const router = useRouter();
  const [signedIn,setSignedIn] = useState(false);
  const [userName,setUserName] = useState("")
  useEffect(()=>{
    let sessiondata = sessionStorage.getItem('isLoggedIn')
    let userData = localStorage.getItem('user')
    if(sessiondata==="true" && !!userData){
      setSignedIn(true);
      userData=JSON.parse(userData || "[]")
      console.log(userData)
      let userId = sessionStorage.getItem("userId")
      let userData1 = userData.find((users)=>users.id===+userId)
      console.log(userId,userData1)
      setUserName(userData1.userName)
    }
    else{
      setSignedIn(false);
      setUserName("");
    }
  })
  console.log(signedIn,"signed in")
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navLinks}>
        <li className={router.pathname === '/' ? styles.active : ''}><a href="/">Home</a></li>
        <li className={router.pathname === '/listings/food-listing' ? styles.active : ''}><a href="/listings/food-listing">Recipe Index</a></li>
      </ul>
      {
        signedIn?
        <h6>{userName}</h6>
        :
        <></>
      }
      <ul className={styles.navLinks_right}>
      {
        signedIn?
        <li className={router.pathname === '/signin' ? styles.active : ''} style={{cursor:'pointer'}} onClick={()=>{sessionStorage.setItem('isLoggedIn', false); window.location.reload()}}>Sign out</li>
        :
        <li className={router.pathname === '/signin' ? styles.active : ''}><a href='/signin'>Sign In</a></li>
      }
      </ul>
    </nav>
  );
};

export default Navbar;
