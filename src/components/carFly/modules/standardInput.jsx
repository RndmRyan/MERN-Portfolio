import React, { useState } from 'react';
import './inputFieldCSS.css'

function standardInput({ register, id, type, placeholder, errorMessage, validation }) {
  return (
    <>
    <div className={`input-group ${validation?.isValid ? '' : 'error'}`}>
      <input {...register(id, validation.rules)} type={type} className="form-control" placeholder={placeholder} />
    </div>
    {!validation?.isValid && <label>{errorMessage}</label>}
    </>
  );
}

export default standardInput;