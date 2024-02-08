import axios from 'axios';
import React, { useEffect, useState } from 'react'
import '../style/Myprojects.css';


function Achievements() {

    const [achievements, setachievements] = useState([]);

    const fetchachievement = async () => {
        try {
            const response = await axios.get('http://localhost:5000/getachievements');

            setachievements(response.data.achievements);
        } catch (error) {
            console.error(error.response?.data?.error || 'Something went wrong');
        }
    };
    useEffect(() => {
        fetchachievement();
    }, []);

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