import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useLocation } from 'react-router';
// import toast from 'react-hot-toast';
// import axios from 'axios';

import useAuth from '../../Hooks/useAuth';
import SocialLogin from './SocialLogin';
import useAxios from '../../Hooks/useAxios';
import axios from 'axios';

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser, updateUserProfile } = useAuth();
    const [profilePic, setProfilePic] = useState();
    const axiosInstance = useAxios();
    const navigate = useNavigate()
    const location = useLocation()
    const from = location?.state?.from || '/'

    const onSubmit = data => {

        createUser(data.email, data.password)
            .then(async (result) => {
              console.log(result.data)

                
                // update user info in database
                const userInfo = {
                    email: data.email,
                    name: data.name,
                    image: profilePic,
                    role: 'user',  //default role
                    created_at: new Date().toISOString(),
                    last_log_in: new Date().toISOString()
                }

                const userResult = await axiosInstance.post('/users', userInfo);
                console.log(userResult.data)

                // update profile in firebase
                const userProfile = {
                    displayName: data.name,
                    photoURL: profilePic
                }
                updateUserProfile(userProfile)
                    .then(() => {
                        console.log('profile name pic updated')
                        console.log(data)
                        navigate(from)
                    })
                    .catch(error => {
                        console.log(error)
                    })

            })
            .catch(error => {
                console.error(error);
            })
    }

    const handleImageUpload = async (e) => {
        const image = e.target.files[0]
        console.log(image);


        const formData = new FormData();
        formData.append('image', image)

        const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`;

        const res = await axios.post(imageUploadUrl, formData);
        setProfilePic(res.data.data.url)
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-white">
            <div className="card w-full max-w-sm bg-white shadow-xl">
                <div className="card-body">
                    <h2 className="text-3xl font-bold text-center mb-4 text-primary">Create Account</h2>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* Name */}
                        <div className="form-control mb-3">
                            <label className="label text-secondary">Your Name</label>
                            <input
                                type="text"
                                {...register('name', { required: true })}
                                className="input bg-gray-100 text-secondary"
                                placeholder="Full Name"
                            />
                            {errors.name && <p className="text-red-500 text-sm">Name is required</p>}
                        </div>

                        {/* image field */}
                        <label className="label text-secondary">Your Name</label>
                        <input type="file"
                            onChange={handleImageUpload}
                            className="file-input file-input-primary  bg-gray-100 text-secondary" placeholder="Your Profile Picture" />


                        {/* Email */}
                        <div className="form-control mb-3">
                            <label className="label text-secondary">Email</label>
                            <input
                                type="email"
                                {...register('email', { required: true })}
                                className="input bg-gray-100 text-secondary"
                                placeholder="Enter email"
                            />
                            {errors.email && <p className="text-red-500 text-sm">Email is required</p>}
                        </div>

                        {/* Password */}
                        <div className="form-control mb-3">
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
                                className="input bg-gray-100 text-secondary"
                                placeholder="Enter password"
                            />

                            {errors.password?.type === 'required' && (
                                <p className="text-red-500 text-sm">Password is required</p>
                            )}

                            {errors.password?.type === 'minLength' && (
                                <p className="text-red-500 text-sm">Password must be at least 6 characters</p>
                            )}

                            {errors.password?.type === 'pattern' && (
                                <p className="text-red-500 text-sm">{errors.password.message}</p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <div className="form-control mt-4 w-full">
                            <button type="submit" className="btn btn-primary text-white w-full">Register</button>
                        </div>

                        {/* Redirect */}
                        <p><small className='text-secondary'>Already have an account?<Link state={{ from }} className="underline text-primary" to="/login">Login</Link></small></p>
                    </form>

                    {/* Social Login */}
                    <SocialLogin />
                </div>
            </div>
        </div>
    );
};

export default Register;
