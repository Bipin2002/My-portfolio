import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react';

function Home() {
    const [personalData, setPersonalData] = useState({
        profileImage: null,
        firstname: '',
        lastname: '',
        designation: '',
        email: '',
        summary: '',
        phone_no: '',
        address: '',
        messenger: '',
    });
    const [userId, setUserId] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decoded = jwtDecode(token);
            setUserId(decoded.userId);
        }
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/getData/${userId}`);
                const fetchedData = response.data.personalData || {};
    
                setPersonalData({
                    profileImage: fetchedData.image || null,
                    firstname: fetchedData.firstname || '',
                    lastname: fetchedData.lastname || '',
                    designation: fetchedData.designation || '',
                    email: fetchedData.email || '',
                    summary: fetchedData.summary || '',
                    phone_no: fetchedData.contact || '',
                    address: fetchedData.address || '',
                    messenger: fetchedData.messenger || '',
                });
            } catch (error) {
                console.error(error.response?.data?.error || 'Something went wrong');
            }
        };
    
        fetchData();
    }, [userId]);
    

    console.log("Profile Image:", personalData.profileImage);

    return (
        <section id='body' className="body">
            <div className='left'>
                <p>Hello, My name is</p>
                <h1>{personalData.firstname}  {personalData.lastname}</h1>
                <p>{personalData.designation}</p>
                <a href={personalData.messenger}><button>LET'S CHAT<img src="Messenger.png" alt="" /></button></a>
            </div>
            <div className='right'>
                {personalData.profileImage && (
                    <img src={personalData.profileImage} alt="Profile Preview" style={{ maxWidth: '50%', aspectRatio: '3/4.5', marginBottom: '10px' }} />
                )}
            </div>
        </section>
    );
}

export default Home;
