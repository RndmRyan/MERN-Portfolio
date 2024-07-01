import React, { useState } from 'react';
import './inputFieldCSS.css'

function passwordInput({ register, id, placeholder, errorMessage, validation }) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <>
    <div className={`input-group ${validation?.isValid ? '' : 'error'}`}>
      <input type={isPasswordVisible ? 'text' : 'password'}
        {...register(id, validation.rules)} className="form-control" placeholder={placeholder} />
      <div className='PasswordVisibility' onClick={()=>setIsPasswordVisible(!isPasswordVisible)}>
        <i className={`fa-regular ${isPasswordVisible ? 'fa-eye' : 'fa-eye-slash'}`}></i>
      </div>
    </div>
    {!validation?.isValid && <label>{errorMessage}</label>}
    </>
  );
}

export default passwordInput;