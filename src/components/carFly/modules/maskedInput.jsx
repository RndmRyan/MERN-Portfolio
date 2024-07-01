import React, { useState } from 'react';
import InputMask from 'react-input-mask';
import './inputFieldCSS.css'

function maskedInput({ register, id, mask, placeholder, errorMessage, validation }) {
  return (
    <>
    <div className={`input-group ${validation?.isValid ? '' : 'error'}`}>
        <InputMask {...register(id, validation.rules)} className="form-control" mask={mask} placeholder={placeholder}/>
        </div>
        {!validation?.isValid && (<><label>{errorMessage}</label></>)}
    </>
  );
}

export default maskedInput;