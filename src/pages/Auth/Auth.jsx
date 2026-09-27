import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { z } from 'zod';
import { useAuth } from '../../context/AuthContext';
import './Auth.css';

const authSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string()
    .min(6, 'Password must be at least 6 Characters')
    .max(12, 'Password must be less than 12 Characters')
});

// Day 21: Zod - Form Validation

function Auth() {
  const [searchParams] = useSearchParams();
  const [mode, setMode] = useState(searchParams.get('mode') === 'signup' ? 'signup' : 'login');
  const [error, setError] = useState(null);
  const { SignUp, Login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError: setFormError
  } = useForm();

  const navigate = useNavigate();

  function onSubmit(data) {
    setError(null);

    const validation = authSchema.safeParse(data);

    if (!validation.success) {
      validation.error.issues.forEach((issue) => {
        setFormError(issue.path[0], {
          type: 'manual',
          message: issue.message
        });
      });
      return;
    }

    const result = mode === 'signup'
      ? SignUp(data.email, data.password)
      : Login(data.email, data.password);

    if (result && result.Success) {
      navigate('/');
    } else if (result && result.error) {
      setError(result.error);
    } else {
      setError('An unexpected error occurred.');
    }
  }

  return (
    <div className='page'>
      <div className='page-container'>
        <div className='auth-container'>
          <h1 className='page-title'>
            {mode === 'signup' ? 'Sign Up' : 'Login'}
          </h1>

          <form className='auth-form' onSubmit={handleSubmit(onSubmit)}>
            {error && (
              <div className='auth-error-banner' style={{ color: '#dc2626' }}>
                {error}
              </div>
            )}

            <div className='form-group'>
              <label className='form-label' htmlFor='email'>
                Email
              </label>
              <input
                className='form-input'
                type='email'
                id='email'
                {...register('email')}
              />
              {errors.email && (
                <span className='form-errors'>{errors.email.message}</span>
              )}
            </div>

            <div className='form-group'>
              <label className='form-label' htmlFor='password'>
                Password
              </label>
              <input
                className='form-input'
                type='password'
                id='password'
                {...register('password')}
              />
              {errors.password && (
                <span className='form-errors'>{errors.password.message}</span>
              )}
            </div>

            <button type='submit' className='btn btn-primary btn-large'>
              {mode === 'signup' ? 'Sign Up' : 'Login'}
            </button>
          </form>

          <div className='auth-swith'>
            {mode === 'signup' ? (
              <p>
                Already have an account{' '}
                <button type='button' onClick={() => setMode('login')} className='auth-link'>
                  Login
                </button>
              </p>
            ) : (
              <p>
                Don't have an account{' '}
                <button type='button' onClick={() => setMode('signup')} className='auth-link'>
                  SignUp
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
