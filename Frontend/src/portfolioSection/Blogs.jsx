import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

function Blogs() {
    const [blogs, setblogs] = useState([]);
    const [userId, setUserId] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
          const decoded = jwtDecode(token);
          setUserId(decoded.userId);
        }
      }, []);
    const fetchblogs = useCallback( async () => {
        try {
            const response = await axios.get(`http://localhost:5000/getblogs/${userId}`);
            setblogs(response.data.blogs);
        } catch (error) {
            console.error(error);
        }
    },[userId]);
    useEffect(() => {
        fetchblogs();
    }, [fetchblogs]);

    return (
        <section id='blogs' className="blogs">
            <h1>BLOGS</h1>
            <div className="list">
                {blogs ? (
                    blogs.map((data) => (
                        <div className="work" key={data._id}>
                            <div className="image">
                                <img src={data.image} alt="" />
                            </div>
                            <div className="des">
                                <h2>{data.name}<a href={data.url}><button>Link</button></a></h2>
                                <p>{data.description}</p>
                            </div>
                          
                        </div>
                    ))
                ) : (
                    <p>Loading blogs...</p>
                )}
            

            </div>

        </section>
    )
}

export default Blogs