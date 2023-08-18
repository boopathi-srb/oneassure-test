import React, { FC, useEffect, useState } from "react";


const Checkbox = ({
  label,
  name,
  defaultChecked,
  onChange,
}) => {

  return (
    <div className={''}>
      <input
        id={name}
        name={name}
        type="checkbox"
        className={``}
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
