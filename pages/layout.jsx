import React from 'react';
import Navbar from '../public/components/NavBar';
import styles from '../styles/Layout.module.css';
import { useEffect } from 'react';
import moment from 'moment';
import { Security } from '../public/utils/hashPass';
import Router from 'next/router';
const Layout = ({ children }) => {
  useEffect(()=>{
    let sessiondata = sessionStorage.getItem('isLoggedIn');
    if(sessiondata==="true"){
      let remember = localStorage.getItem("remember");
      if(remember==="true"){
        let token = localStorage.getItem("token")
        token = Security.decodeString(token);
        let exp =moment(token.split("-")[1])
        moment().isAfter(exp)?(
          function setNewToken(){
            localStorage.setItem('token', Security.encodeString(Math.random().toString()+moment().add(2,'days').format("-HH:mm:ss")))
          }()
        )
        :
        token=token;
      }
      else{
        let token = sessionStorage.getItem("token");
        token = Security.decodeString(token);
        let exp =moment(token.split("-")[1]);
        moment().isAfter(exp)?
        Router.push(`/signin/redirect-${window.location.pathname.replace(/\//g, "+")}`):
        exp=exp;
      }
    }
  },[])
  return (
    <div className={styles.container}>
      <Navbar />
      <main className={styles.content}>{children}</main>
      {/* <footer className={styles.footer}>Footer content here</footer> */}
    </div>
  );
};

export default Layout;
