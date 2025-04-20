'use client'

import React from "react";
import UserDetailsForm from "../components/UserDetailsForm";
import { useEffect, useState } from 'react';

import Cookies from 'js-cookie';

const UserDetailsPage = () => {

  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchedUserId = Cookies.get('userId');
    setUserId(fetchedUserId || null);  
  }, []);

  console.log(userId);
  
  if(!userId){
    return <p>Loading...</p>
  }

  return (
    <>
    <UserDetailsForm  userId = {userId}/>
    </>
  )
}

export default UserDetailsPage;