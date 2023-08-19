// components/Overlay.js
import React, { useEffect } from 'react';
import styles from '../../styles/OverLay.module.css';

const Overlay = ({ children, showOverLay }) => {
  useEffect(()=>{
    const targetDiv = document.getElementById('targetDiv');
    document.addEventListener('click', function(event) {
      if (targetDiv.contains(event.target)) {
        showOverLay(false)
      }
    });
  },[])
  

  return (
    <div id="targetDiv" className={styles.overlay}>
      <div  className={styles.overlayContent}>
        {children}
      </div>
    </div>
  );
};

export default Overlay;
