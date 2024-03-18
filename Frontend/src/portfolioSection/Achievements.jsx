import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react'
import '../style/Myprojects.css';
import { jwtDecode } from 'jwt-decode';


function Achievements() {

    const [achievements, setachievements] = useState([]);
    const [userId, setUserId] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
          const decoded = jwtDecode(token);
          setUserId(decoded.userId);
        }
      }, [userId]);

    const fetchachievement = useCallback( async () => {
        try {
            const response = await axios.get(`http://localhost:5000/getachievements/${userId}`);

            setachievements(response.data.achievements);
        } catch (error) {
            console.error(error.response?.data?.error || 'Something went wrong');
        }
    },[userId]);
    useEffect(() => {
        fetchachievement();
    }, [fetchachievement]);

    return (
        <section id='certificates' className="certificates">
            <h1>Achievements and Certificates</h1>

            <div className="show_achievements" >
                {achievements ? (
                    achievements.map((data) => (
                        <div className='hello'>
                            <img className="image" src={data.image} alt="" />
                            <h3>{data.name}</h3>
                            <p>{data.date}</p>
                        </div>
                    ))
                ) : (
                    <p>Loading achievements...</p>
                )}
            </div>

        </section>
    )
}


export default Achievements