import { useState } from 'react'
import { useForm } from 'react-hook-form'
import './signupform.css'
import PasswordInput from './modules/passwordInput';
import StandardInput from './modules/standardInput';
import MaskedInput from './modules/maskedInput';

function signupform() 
{
  
  const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm({
    mode:"onChange"
  });
  const [userType, setUserType] = useState('');
  const [isTypeSelected, setTypeSelected] = useState(true);


  const handleInputFieldChange = (event) => 
  {
    const value = event.target.value;
    const {id} = event.target;
    if (id === 'userType')
      {
        setTypeSelected(value == 'seller' || value == 'customer');
        setUserType(value);
      }
  }

  const handleFormSubmit = (data) => {
    console.log('Form submitted', data);
  }


  return (
    <div className='SignUpForm'>
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className='form-group'>

        <div className={`input-group ${userType ? '' : 'error'}`}>
          <select {...register('userType', { required: true })}
          className='form-control' id="userType" value={userType} onChange={handleInputFieldChange}>
            <option value="" disabled>Select User Type *</option>
            <option value="seller">Seller</option>
            <option value="customer">Customer</option>
          </select>
        </div>
          {errors.userType && <label>Please select a user type</label>}



        <StandardInput register={register} id="firstname" type="text" placeholder="Enter First Name *" 
        errorMessage="Enter 3 or more letters for First Name" 
        validation={{
          rules: { required: true, minLength: 3, pattern: /^[A-Za-z]*$/ },
          isValid: !errors.firstname
        }} />
        <StandardInput register={register} id="lastname" type="text" placeholder="Enter Last Name *" 
        errorMessage="Enter 3 or more letters for Last Name" 
        validation={{
          rules: { required: true, minLength: 3, pattern: /^[A-Za-z]*$/ },
          isValid: !errors.lastname
        }} />

        
        <MaskedInput
          register={register} id="number" mask="+1(999)-999-9999"
          placeholder="Enter Cell Number *" errorMessage="Invalid Cell No. e.g +1 123 456 7890"
          validation={{
            rules: { required: true, pattern: /^\+1\(\d{3}\)-\d{3}-\d{4}$/ },
            isValid: !errors.number
          }}
        />

        <StandardInput register={register} id="email" type="email" placeholder="Enter Email *" 
        errorMessage="Invalid Email" 
        validation={{
          rules: { required: true, pattern: /^[^\s@]+@[a-zA-Z]{2,}\.[a-zA-Z]{1,}$/ },
          isValid: !errors.email
        }} />
        
        <PasswordInput register={register} id="password" placeholder="Enter Password *" 
        errorMessage="Password must at least have 8 characters with special characters, numbers, uppercase and lowercase letters" 
        validation={{
          rules: { required: true, minLength: 8, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/},
          isValid: !errors.password
        }} />
        
        <PasswordInput register={register} id="confirmPassword" placeholder="Confirm Password *" 
        errorMessage="Passwords do not match" 
        validation={{
          rules: {
            required: true,
            validate: value => value === getValues('password') || "Passwords do not match"
          },
          isValid: !errors.confirmPassword
        }} />  

          <input className='formbutton' type="submit"value="Sign Up"/>
          <p>Already have an account? <a href='#'>Login here</a></p>
        </div>
        </form>
    </div>
  )
}

export default signupform
