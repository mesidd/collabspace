// app/auth/signup.tsx

'use client';

import React, { use, useState } from 'react';
import { deflate } from 'zlib';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); //
  const [showPassword, setShowPassword] = useState(false);

  // const [phone, setPhone] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/auth/signup', {
        method: "POST",
        headers: {
          "Content-Type" : "application/json"
        },
        body: JSON.stringify({username, email, password})
      });

      const data = await res.json();
      setError(data.message);

      if(res.ok) {
        setUsername("");
        setEmail("");
        setPassword("");
      }
      
    } catch (error) {
      setError("Something went wrong");
    }

  }

  return (
    <div className='max-w-md mx-auto p-6 bg-white rounded-lg shadow-md'>

      {/* <h1 className="text-2xl font-bold mb-4">Sign Up</h1> */}
      {/* {error && <p className='text-2xl text-green-500 text-center'>{error}</p>} */}

      <form onSubmit={handleSubmit}>

        <div className='mb-4 mt-6'>
          <label htmlFor="email" className='block text-sm font-medium text-gray-700'>
            Email
          </label>
          <input 
            id='email'
            type='email'
            className='mt-1 p-2 w-full border border-gray-300 rounded-md'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete='off'
            required
          />
        </div>

      <div className='mb-4'>
        <label htmlFor="username" className='block text-sm font-medium text-gray-700'>
          Username
        </label>
        <input 
          id='username'
          type='text'
          className='mt-1 p-2 w-full border border-gray-300 rounded-md'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>

      <div className='mb-4'>
        <label htmlFor="password" className='block text-sm font-medium text-gray-700'>
          Password
        </label>
        <div className='relative'>
        <input
          id='password'
          type={showPassword? 'text' : 'password'}
          className='mt-1 p-2 w-full border border-gray-300 rounded-md text-lg'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
          <button
          type='button'
          onClick={() => setShowPassword(!showPassword)}
          className='absolute right-3 top-1/2 text-sm -translate-y-1/2 text-blue-500 focus-outline-none cursor-pointer'
        >
          {showPassword ? 'Hide' : 'Show'}
        </button>
        </div>
      </div>
{/* 
      <div className='mb-4'>
        <label htmlFor="phone" className='block text-sm font-medium text-gray-700'>
          Phone Number
        </label>
        <input
          id='phone'
          type="tel"
          className='mt-1 p-2 w-full border border-gray-300 rounded-md'
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </div> */}

      <button 
        type='submit'
        className='w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer' 
      >
        Sign Up
      </button>
      </form>

      {error && <p className={`text-2xl text-center mt-4 ${error === "User registered successfully!" ? 'text-green-600' : 'text-red-700'}`}>{error}</p>}
    </div>
  )

}

export default Signup;
