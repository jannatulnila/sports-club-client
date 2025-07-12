import React from 'react';

import { Link, useLocation, useNavigate } from 'react-router';

import useAuth from '../../Hooks/useAuth';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import SocialLogin from './SocialLogin';


const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signIn } = useAuth();
    const location = useLocation();
    const navigate = useNavigate()
    const from = location?.state?.from || '/';

    const onSubmit = data => {
        signIn(data.email, data.password)
            .then(result => {
                console.log(result);
                Swal.fire('Success', 'Login successful!', 'success');
                navigate(from)
            })
            .catch(error => {
                console.error(error);
            })
    }

    return (
        <div  className="min-h-screen flex items-center justify-center bg-white px-4">
             <div className="card bg-white w-full max-w-sm shrink-0 shadow-2xl">
              <div className="card-body">
                  <h1 className="text-5xl text-primary font-bold">Please Login</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <fieldset className="fieldset">

                        <label className="label text-secondary">Email</label>
                        <input
                            type="email"
                            {...register('email')}
                            className="input bg-gray-100 text-secondary" placeholder="Email" />


                        <label className="label text-secondary">Password</label>
                        <input
                            type="password"
                               {...register('password', {
                                    required: true,
                                    minLength: 6,
                                    pattern: {
                                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?-]).{6,}$/,
                                        message: 'Password must contain uppercase, lowercase, number, and special character'
                                    }
                                })}
                            className="input bg-gray-100 text-secondary" placeholder="Password" />
                        {errors.password?.type === 'required' && (
                                <p className="text-red-500 text-sm">Password is required</p>
                            )}

                            {errors.password?.type === 'minLength' && (
                                <p className="text-red-500 text-sm">Password must be at least 6 characters</p>
                            )}

                            {errors.password?.type === 'pattern' && (
                                <p className="text-red-500 text-sm">{errors.password.message}</p>
                            )}

                        <div><a className="link link-hover text-secondary">Forgot password?</a></div>

                        <button className="btn btn-primary text-black mt-4">Login</button>
                    </fieldset>
                    <p><small className='text-secondary'>New to this website? <Link state={{ from }} className="underline text-primary" to="/register">Register</Link></small></p>
                </form>
                <SocialLogin />
              </div>
             </div>  
        </div>
    );
};

export default Login;