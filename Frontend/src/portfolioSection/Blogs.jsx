import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Blogs() {
    const [blogs, setblogs] = useState([]);
    const fetchblogs = async () => {
        try {
            const response = await axios.get('http://localhost:5000/getblogs');
            setblogs(response.data.blogs);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        fetchblogs();
    }, []);

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