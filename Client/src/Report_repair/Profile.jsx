import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getToken, getUser } from '../auth/auth';

const calculateAge = (birthdate) => {
    const birthDate = new Date(birthdate);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
};

export default function Profile() {

    const [profileData, setProfileData] = useState(null);
    const token = getToken(); 
    const UUID = getUser(); 
    
    const getProfileData = async () => {
        try {
            const response = await axios.post(
                'http://localhost:4211/api/getprofile',
                { UUID },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(response.data);
            
            setProfileData(response.data);
        } catch (error) {
            console.error('Error fetching profile data:', error);
        } 

    };

    useEffect(() => {
        getProfileData();
        
    }, []);

    if (!profileData) {
        return <div>Loading...</div>; // สามารถใช้หน้าจอ loading หรือข้อความบอกผู้ใช้ได้
    }

    const age = calculateAge(profileData.birthdate); 

    return (
<div className="flex flex-col justify-center items-center h-[91vh] px-4 font-athiti">
  <div className="bg-white flex flex-col md:flex-row h-[90%] w-full md:w-[85vw] max-w-4xl rounded-lg shadow-lg overflow-auto mx-auto">
    {/* Left Section for Profile Information */}
    <div className="flex flex-col bg-gradient-to-r from-gray-700 to-gray-500 p-4 text-white w-full md:w-[30%] items-center p-6">
      <img 
        src={profileData.profileimg} 
        className="w-32 h-32 rounded-full border-4 border-gray-500" 
        alt={`Profile`} 
      />
      <h2 className="mt-4 text-3xl text-white font-bold text-center">{`${profileData.title} ${profileData.firstname} ${profileData.lastname}`}</h2>
      <p className="text-white text-center">{`พนักงาน ID: ${profileData.CodeID}`}</p>
      <p className="text-white text-center">{`ตำแหน่ง: ${profileData.position}`}</p>
      <p className="text-white text-center">{`แผนก: ${profileData.departments}`}</p>
      <p className="text-white text-center">{`สถานะ: ${profileData.status}`}</p>
      <p className="text-white text-center">{`วันเกิด: ${new Date(profileData.birthdate).toLocaleDateString()}`}</p>
      <p className="text-white text-center">{`อายุ: ${age} ปี`}</p>
      <p className="text-white text-center">{`เพศ: ${profileData.sex}`}</p>
    </div>

    {/* Right Section for Address and Contact Information */}
    <div className="flex flex-col  w-full md:w-[70%] p-8 overflow-auto">
      <h3 className="text-xl font-semibold text-gray-800">ข้อมูลที่อยู่</h3>
      <p className='mt-2'>ที่อยู่: {profileData.address}</p>
      <p>เขต: {profileData.district}</p>
      <p>แขวง: {profileData.subdistrict}</p>
      <p>หมู่: {profileData.village}</p>
      <p>ถนน: {profileData.road}</p>
      <p>จังหวัด: {profileData.county}</p>
      <p>รหัสไปรษณีย์: {profileData.postalCode}</p>

      <hr className="mt-6 border-t-2 border-gray-400" />

      <h3 className="text-xl font-semibold mt-6 text-gray-800">การติดต่อ</h3>
      <p className='mt-2'>Email: {profileData.email}</p>
      <p>เบอร์โทร: {profileData.phone}</p>
      <p>Facebook: {profileData.facebook}</p>
      <p>Line: {profileData.line}</p>

      <hr className="mt-6 border-t-2 border-gray-400" />
      <h3 className="text-xl font-semibold mt-6 text-gray-800">วุฒิการศึกษา</h3>
      <p className='mt-2'>สถาบันการศึกษา: โรงเรียนวิทยาคม</p>
      <p>เกรดเฉลี่ย: 1.1</p>
      <p>วุฒิ: ม.ปลาย</p>
    </div>
  </div>
</div>

    
    );
}



