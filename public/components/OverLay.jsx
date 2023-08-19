// components/Overlay.js
import React, { useEffect, useRef, useState } from 'react';
import styles from '../../styles/OverLay.module.css';

const Overlay = ({ children, showOverlay }) => {
  const [showOverLay, setShowOverLay] = useState(showOverlay)
  const containerRef = useRef(null);
  const overLayRef = useRef(null);
  useEffect(()=>{
    setShowOverLay(true)
  },[showOverlay])
  // useEffect(() => {
  //   if (eventClickOutsideDiv) {
  //     document.removeEventListener("click", eventClickOutsideDiv);
  //   }
   
  //   showOverLay && document.addEventListener("click", eventClickOutsideDiv);
  //   return () => {
  //     document.removeEventListener("click", eventClickOutsideDiv);
  //   };
  // }, [showOverLay]);
  
  const eventClickOutsideDiv = (event) => {
    if (!containerRef.current) {
      console.log("event here")
      return;
    }
    // CLICK IN_SIDE
    if (!showOverLay || containerRef.current.contains(event.target)) {
      console.log("bug here")
      return;
    }
    if(event.target===overLayRef.current){
      console.log(event.target, containerRef.current,"refs")
      setShowOverLay(false)
    }
    else{
      setShowOverLay(true)
    }
    // CLICK OUT_SIDE
  };
  console.log(showOverLay,'overlay')
  return (
    <>
      <div ref={overLayRef} className={styles.overlay}>
        <div id="targetDiv" ref={containerRef} className={styles.overlayContent}>
          {children}
        </div>
      </div>
    </>
  );
};

export default Overlay;
