'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
interface Props {
  userId: string;
}

const UserDetailsForm: React.FC<Props> = ({userId}) => {
  const router = useRouter();
  const [formData, setFormData ] = useState({
    currentPosition: '',
    goals: '',
    challenges:'',
    achievements:'',
    motivationalInterests:''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({...prev, [e.target.name]: e.target.value}));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const res = await fetch('/api/user/user-details',{
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({...formData, userId}),
      });
      const data = await res.json();
      if(res.ok) {
        setSuccess(true)
        router.push('/dashboard')
      }
      else alert(data.message);

    } catch(error){
      console.error(error);
      alert('Something went wrong');
    }
    setLoading(false);
  };

return(
 <form onSubmit={handleSubmit} className='space-y-4 max-w-xl mx-auto p-4'>
  <div>
    <label className='block mb-1 font-semibold'>Current Position</label>
    <input 
      name='currentPosition'
      value={formData.currentPosition}
      onChange={handleChange}
      className='w-full border rounded p-2'
    />
  </div>

  <div>
    <label className='block mb-1 font-semibold'>Your Goal</label>
    <textarea 
      name='goals'
      value={formData.goals}
      onChange={handleChange}
      className='w-full border rounded p-2'
    />
  </div>

  <div>
    <label className='block mb-1 font-semibold'>Problems</label>
    <textarea 
      name="challenges" 
      value={formData.challenges}
      onChange={handleChange}
      className='w-full border rounded p-2' 
    />
  </div>

  <div>
    <label className='block mb-1 font-semibold'>Achievements</label>
    <textarea 
      name='achievements'
      value={formData.achievements}
      onChange={handleChange}
      className='w-full border rounded p-2'
    />
  </div>
  <button
    type='submit'
    disabled={loading}
    className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer'
  >
    {loading ? 'Saving...' : 'Save Details'}
  </button>
  {success && <p className='text-green-600 mt-2'>Details Saved Successfully!</p>}
 </form>
  )
}

export default UserDetailsForm;