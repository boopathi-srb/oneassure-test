import React from 'react';
import Navbar from '../public/components/NavBar';
import styles from '../styles/Layout.module.css';

const Layout = ({ children }) => {
  return (
    <div className={styles.container}>
      <Navbar />
      <main className={styles.content}>{children}</main>
      {/* <footer className={styles.footer}>Footer content here</footer> */}
    </div>
  );
};

export default Layout;
