// components/Overlay.js
import React from 'react';
import styles from '../../styles/OverLay.module.css';

const Overlay = ({ children }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.overlayContent}>
        {children}
      </div>
    </div>
  );
};

export default Overlay;
