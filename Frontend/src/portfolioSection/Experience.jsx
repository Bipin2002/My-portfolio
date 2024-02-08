import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Experience() {
    const [works, setworks] = useState([]);
    const fetchworks = async () => {
        try {
            const response = await axios.get('http://localhost:5000/getworks');

            setworks(response.data.works);
        } catch (error) {
            console.error(error.response?.data?.error || 'Something went wrong');
        }
    };
    useEffect(() => {
        fetchworks();
    }, []);
    return (
        <section id='Experience' className="Experience">
            <h1>Experience And Volunteer</h1>
            <div className="list">
                {works ? (
                    works.map((data) => (
                        <div className="info" key={data._id}>
                            <img src={data.image} alt="" />
                            <div className="des">
                                <h2>{data.name}</h2>
                                <p>{data.description}</p>
                            </div>
                        </div>

                    ))
                ) : (
                    <p>Loading Works...</p>
                )}


            </div>

        </section>
    )
}

export default Experience