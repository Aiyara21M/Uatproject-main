import React, { useEffect, useState } from 'react';
import { authenticate, getUser } from '../auth/auth';

// ฟังก์ชันสร้างข้อมูลจำลอง


const Index = () => {

    document.title = "Index Page" 
    
  return (
   <>
   
   <div>
      <h1>this index page</h1>
   </div>

   </>
  
  )
};

export default Index;
