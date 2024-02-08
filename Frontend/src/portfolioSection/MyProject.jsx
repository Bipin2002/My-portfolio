import axios from 'axios';
import React, { useEffect, useState } from 'react'

function MyProject() {

    const [projects, setProjects] = useState([]);

    const fetchProjects = async () => {
        try {
            const response = await axios.get('http://localhost:5000/getProjects');

            setProjects(response.data.projects);
        } catch (error) {
            console.error(error.response?.data?.error || 'Something went wrong');
        }
    };
    useEffect(() => {
        fetchProjects();
    }, []);

    return (
        <section id='projects' className="projects">
            <h1>My Projects</h1>
            <div className='hello'>
                <p>I showcases my projects completed during my college studies, demonstrating my skills and creativity in solving various challenges.</p>
            </div>
            <div className="projects_list">
                {projects.map((data, index) => (
                    <div className='project' key={data._id}>
                        {/* {index % 2 === 0 ? (
                            <>
                                <div>
                                    <img src={data.image} alt="" />
                                </div>
                                <div>
                                    <h3>{data.name} <a href={data.url}><button>Link</button></a></h3>
                                    <br />
                                    <p>{data.description}</p>
                                </div>
                            </>
                        ) : (
                            <>
                                <div>
                                    <h3>{data.name} <a href={data.url}><button>Link</button></a></h3>
                                    <br />
                                    <p>{data.description}</p>
                                </div>
                                <div>
                                    <img src={data.image} alt="" />
                                </div>
                            </>
                        )} */}
                        <div>
                            <img src={data.image} alt="" />
                        </div>
                        <div>
                        <br />

                            <h3>{data.name} </h3>
                            <br />

                        </div>
                        <div>
                        <p>Github link: <a href={data.url}><button>Link</button></a></p>
                        
                        


                        </div>
                    </div>
                ))}


            </div>
        </section>
    )
}

export default MyProject