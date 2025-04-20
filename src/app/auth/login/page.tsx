'use client'

import React, { useState } from 'react';
import { deflate } from 'zlib';
import { useRouter } from 'next/navigation';

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/auth/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: 'include',
        body: JSON.stringify({email, password})
      });

      const data = await res.json();
      setError(data.message);

      if(res.ok ) {
        setEmail('');
        setPassword('');
        router.push(`/user-details`);
      }

    } catch (error) {
    setError("Something went wrong")
    }
  }

  return (
    <div className='max-w-md mx-auto p-6 bg-white rounded-lg shadow-md'>
      <form onSubmit={handleSubmit}>
        <div className='mb-4 mt-6'>
          <label htmlFor="email" className='block text-sm font-medium text-gray-700'>
            Email
          </label>
          <input 
            id='email'
            type="email" 
            value={email}
            className='mt-1 p-2 w-full border border-gray-300 rounded-md'
            onChange={(e) => setEmail(e.target.value)}
            autoComplete='off'
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
              type={showPassword ? 'text' : 'password'}
              className='mt-1 p-2 w-full border border-gray-300 rounded-md text-lg'
              value={password}
              onChange={(e) => {setPassword(e.target.value)}}
              required
            />
          <button
            type='button'
            onClick={()=> setShowPassword(!showPassword)}
            className='absolute right-3 top-1/2 text-sm -translate-y-1/2 text-blue-500 focus: outline-none cursor-pointer'
          >
            { showPassword ? 'Hide' : 'Show' }
          </button>
          </div>
        </div>

        <button
          type='submit'
          className='w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer'
        >
          Log In
        </button>
      </form>

    </div>
  )
}

export default Login;