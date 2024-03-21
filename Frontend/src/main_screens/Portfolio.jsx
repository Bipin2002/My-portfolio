
import React, { useEffect, useState } from 'react';
import '../style/Portfolio.css';
import Home from '../portfolioSection/Home';
import MyProject from '../portfolioSection/MyProject';
import Blogs from '../portfolioSection/Blogs';
import Experience from '../portfolioSection/Experience';
import Achievements from '../portfolioSection/Achievements';
// import Resume from '../portfolioSection/Resume';

import { jwtDecode } from 'jwt-decode';
import axios from 'axios';


function Portfolio() {
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
        facebook: '',
        instagram: '',
        linkedin: '',
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
                    messenger: fetchedData.messenger || "",
                    facebook: fetchedData.facebook || "",
                    instagram: fetchedData.instagram || "",
                    linkedin: fetchedData.linkedin || "",
                });
            } catch (error) {
                console.error(error.response?.data?.error || 'Something went wrong');
            }
        };

        fetchData();
    }, [userId]);






    return (
        <div>
            <div className="nav">

                <h1>Portfolio</h1>



                <ul>
                    <li><a href="#body">Home</a></li>
                    {/* <li><a href="#about">About Me</a></li> */}
                    <li><a href="#projects">My Projects</a></li>
                    <li><a href="#blogs">My Blogs</a></li>
                    <li><a href="#Experience">Experience</a></li>
                    <li><a href="#certificates">Achievements</a></li>
                    <li><a href="#about">Contacts</a></li>
                </ul>
                <div className='button'>
                    <a href={personalData.messenger}><button>Let's Talk</button></a>

                </div>

            </div>
            <Home />
            {/* <Resume/> */}
            <MyProject />
            <Blogs />
            <Experience />
            <Achievements />
            {/* <AboutMe /> */}
            <footer id='about' className='about'>
                <div className="info">
                    <h2>{personalData.firstname} {personalData.lastname}</h2>
                    <p>{personalData.summary}</p>
                    <h4>Contact: {personalData.phone_no}</h4>
                    <h4>e-mail: {personalData.email}</h4>
                    <h4>Address: {personalData.address}</h4>
                    <div className='socials'>
                        <ul>
                            <li><a href={personalData.instagram}><img src="Instagram.png" alt="" /></a></li>
                            <li><a href={personalData.facebook}><img src="facebook.png" alt="" /></a></li>
                            <li><a href={personalData.linkedin}><img src="Linked in.png" alt="" /></a></li>

                        </ul>
                    </div>
                </div>

                <div className="feedback">
                    <h2>Feedback</h2>
                    <label htmlFor="email"> Email Address</label>
                    <input type="email" />
                    <label htmlFor="message">Message</label>
                    <input type="text" />
                    <button>Send</button>

                </div>

            </footer>
        </div>
    );
}

export default Portfolio

