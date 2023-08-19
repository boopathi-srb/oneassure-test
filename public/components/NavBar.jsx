import React, { useEffect, useState } from 'react';
import styles from '../../styles/Navbar.module.css';
import { useRouter } from 'next/router';

const Navbar = () => {
  const router = useRouter();
  const [signedIn,setSignedIn] = useState(false);
  const [userName,setUserName] = useState("")
  useEffect(()=>{
    let sessiondata = sessionStorage.getItem('isLoggedIn')
    if(sessiondata==="true"){
      setSignedIn(true);
      let userData = localStorage.getItem('user')
      setUserName(JSON.parse(userData)?.userName)
    }
    else{
      setSignedIn(false);
      setUserName("");
    }
  })
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
      <ul className={styles.navLinks}>
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
