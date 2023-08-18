import React, { FC, useEffect, useState } from "react";
import styles from '../../styles/Checkbox.module.css'
const Checkbox = ({
  label,
  name,
  defaultChecked,
  onChange,
}) => {

  return (
    <div className={styles.checkbox_wrapper}>
      <input
        id={name}
        name={name}
        type="checkbox"
        className={styles.checkbox}
        checked={defaultChecked}
        onChange={(e) => onChange && onChange(e.target.checked)}
      />
        <label
          htmlFor={name}
          className={''}
        >
          <p className={``}>
            {label}
          </p>
        </label>
     
    </div>
  );
};

export default Checkbox;
