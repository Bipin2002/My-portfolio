import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../style/manageprofile.css';
import { jwtDecode } from 'jwt-decode';


function ManageProfile() {

    const [personalData, setPersonalData] = useState({
        profileImage: null,
        firstname: '',
        lastname: '',
        designation: '',
        email: '',
        summary: '',
        phone_no: '',
        address: '',
    });
    const [userId, setUserId] = useState('');
    const [personals, setpersonals] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decoded = jwtDecode(token);
            setUserId(decoded.userId);
        }
    }, []);

    const handleChange = (e) => {
        if (e.target.name === 'profileImage') {
            const file = e.target.files[0];
            setPersonalData({
                ...personalData,
                profileImage: file,
                imagePreview: URL.createObjectURL(file) // Set image preview URL
            });
        } else {
            setPersonalData({
                ...personalData,
                [e.target.name]: e.target.value,
            });
        }
    };


    const handleAddData = async () => {
        try {
            const formData = new FormData();
            formData.append('profileImage', personalData.profileImage);
            formData.append('firstname', personalData.firstname);
            formData.append('lastname', personalData.lastname);
            formData.append('designation', personalData.designation);
            formData.append('email', personalData.email);
            formData.append('summary', personalData.summary);
            formData.append('phone_no', personalData.phone_no);
            formData.append('address', personalData.address);
            await axios.post(`http://localhost:5000/createData/${userId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // Reset form data after successful submission
            setPersonalData({
                profileImage: '',
                firstname: '',
                lastname: '',
                designation: '',
                email: '',
                summary: '',
                phone_no: '',
                address: '',
            });
        } catch (error) {
            console.error(error);
        }
    };
    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/getData/${userId}`);
            setpersonals(response.data.data1); 
        } catch (error) {
            console.error(error.response?.data?.error || 'Something went wrong');
        }
    };
    
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <section className='manageprofile'>
            <h1>Personal Details</h1>
            <form>
                <label htmlFor="profileImage">Profile Image</label>
                {personalData.imagePreview && (
                    <img src={personalData.imagePreview} alt="Profile Preview" style={{ maxWidth: '50%', aspectRatio: '3/4.5', marginBottom: '10px' }} />
                )}
                <input type="file" name='profileImage' onChange={handleChange} required />

                <label htmlFor="firstname">First Name</label>
                <input type="text" name="firstname" value={personalData.firstname} onChange={handleChange} required />
                <label htmlFor="lastname">Last Name</label>
                <input type="text" name="lastname" value={personalData.lastname} onChange={handleChange} required />
                <label htmlFor="designation">Designation</label>
                <input type="text" name="designation" value={personalData.designation} onChange={handleChange} required />
                <label htmlFor="email">Email</label>
                <input type="email" name="email" value={personalData.email} onChange={handleChange} required />
                <label htmlFor="summary">Summary</label>
                <textarea name="summary" value={personalData.summary} onChange={handleChange} required></textarea>
                <label htmlFor="phone_no">phone_no</label>
                <input type="text" name="phone_no" value={personalData.phone_no} onChange={handleChange} required />
                <label htmlFor="address">Address</label>
                <input type="text" name="address" value={personalData.address} onChange={handleChange} required />
                <button type="button" onClick={handleAddData}>Update</button>

                <div>
                    {personals.map((personal, index) => (
                        <div key={index}>
                            <h2>Personal Data {index + 1}</h2>
                            <p>First Name: {personal.firstname}</p>
                            <p>Last Name: {personal.lastname}</p>
                            <p>Designation: {personal.designation}</p>
                            <p>Email: {personal.email}</p>
                            <p>Summary: {personal.summary}</p>
                            <p>Phone Number: {personal.phone_no}</p>
                            <p>Address: {personal.address}</p>
                            {/* You can add more fields as needed */}
                        </div>
                    ))}
                </div>
            </form>

        </section>
    )
}

export default ManageProfile