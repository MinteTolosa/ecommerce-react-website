import  { useState, useContext } from 'react'
import { useForm } from 'react-hook-form';
import { AuthContext } from '../context/AuthContext';
import './Auth.css';

function Auth() {

  const [mode, setMode] = useState("signup");
  const {signUp, user, logout, login} = useContext(AuthContext);
  const {
    register, 
    handleSubmit, 
    formState: {errors},
  } = useForm();

  function onSubmit(data){
    if (mode === "signup") {
      signUp(data.email, data.password);
    } else {
      login(data.email, data.password);
    }
  }

  return (
    <div className='page'>
      <div className='page-container'>
        <div className='auth-container'>
          <h1 className='page-title'> 
            {mode === "signup" ? "Sign Up" : "Login"} </h1>
          
          <form className='auth-form' onSubmit={handleSubmit(onSubmit)}>

            <div className='form-group'>
              <label className='form-label' htmlFor='email'>
                Email
              </label>
              <input className='form-input' type='email' id='email'
              {...register("email", {required: "Email is required"})}/>
              {errors.email && <span className='form-errors'>{errors.email.message}</span>}
            </div>
            

            <div className='form-group'>
              <label className='form-label' htmlFor='password'>
                Password
              </label>
              <input className='form-input' type='password' id='password'
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 Characters",
                },
                maxLength: {
                  value: 12,
                  message: "Password must be less than 12 Characters",
                }})} />
              {errors.password && <span style={{color:'#dc2626'}}>{errors.password.message}</span>}

            </div>

            

            <button type='submit' className='btn btn-primary btn-large'>
              {mode === "signup" ? "Sign Up" : "Login"}</button>
          </form>

          <div className='auth-swith'> 
            {mode === "signup" ? 
            <p>Already have an account <span onClick={()=>{setMode("login")}} className='auth-link'>Login</span></p> :
            <p>Don't have an account <span onClick={()=>{setMode("signup")}} className='auth-link'>SignUp</span></p>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth;