
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../style/Dashboard.css";

function ManageProjects() {
    const [projectData, setProjectData] = useState({
        projectname: '',
        projectimage: null,
        Projectdescription: '',
        ProjectUrl: '',
    });
    const [projects, setProjects] = useState([]);
    const [editingProjectId, setEditingProjectId] = useState(null);


    const handleChange = (e) => {
        if (e.target.name === 'projectimage') {
            setProjectData({
                ...projectData,
                projectimage: e.target.files[0],
            });
        } else {
            setProjectData({
                ...projectData,
                [e.target.name]: e.target.value,
            });
        }
    };

    const handleAddProject = async () => {
        try {
            const formData = new FormData();
            formData.append('projectname', projectData.projectname);
            formData.append('projectimage', projectData.projectimage);
            formData.append('Projectdescription', projectData.Projectdescription);
            formData.append('ProjectUrl', projectData.ProjectUrl);

            if (editingProjectId) {
                await axios.put(`http://localhost:5000/editproject/${editingProjectId}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
             
                
            } else {
                await axios.post('http://localhost:5000/createProject', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                
               
            }
            fetchProjects();
            setProjectData({
                projectname: '',
                projectimage: 'null',
                Projectdescription: '',
                ProjectUrl: '',
            });
    
            setEditingProjectId(null);
           


        } catch (error) {
            console.error(error.response?.data?.error || 'Something went wrong');
        }
    }

    const fetchProjects = async () => {
        try {
            const response = await axios.get('http://localhost:5000/getProjects');

            setProjects(response.data.projects);
        } catch (error) {
            console.error(error.response?.data?.error || 'Something went wrong');
        }
    };


    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/deleteprojects/${id}`);
            fetchProjects();
        } catch (error) {
            console.error(error.response?.data?.error || 'Something went wrong');
        }
    };

    const handleEdit = (id) => {
        const projectToEdit = projects.find((project) => project._id === id);
        setProjectData({
            projectname: projectToEdit.name,
            projectimage: projectToEdit.image,
            Projectdescription: projectToEdit.description,
            ProjectUrl: projectToEdit.url,
        });
        setEditingProjectId(id);
    };

    useEffect(() => {
        fetchProjects();
    }, []);
    return (
        <section className='add_projects'>
            <div className="add">

                <h1>{editingProjectId ? 'Edit Project': 'Add Project'}</h1>
                <form>
                    <label htmlFor="projectname">Project Name</label>
                    <input type="text" name="projectname" value={projectData.projectname} onChange={handleChange} required/>
                    <label htmlFor="projectimage">Project Image </label>
                    <input type="file" name="projectimage" onChange={handleChange} required/>
                    <label htmlFor="Projectdescription">Description</label>
                    <input type="text" name="Projectdescription" value={projectData.Projectdescription} onChange={handleChange} required/>
                    <label htmlFor="ProjectUrl">Project Link</label>
                    <input type="text" name="ProjectUrl" value={projectData.ProjectUrl} onChange={handleChange} />
                    <button type="button" onClick={handleAddProject}>
                        {editingProjectId ? 'Update' : 'Add'}
                    </button>
                </form>


            </div>


            <div className='placeholder'></div>
            <div className="show">

                <h1>Projects</h1>

                {projects.map((data) => (
                    <div className='info' >
                        <div className='image'>
                            <img src={data.image} alt="" />
                        </div>
                        <div className='des'>
                            <h2>{data.name}</h2>
                            <p>{data.description}</p>
                        </div>
                        <div>
                            <p>Link: {data.url}</p>
                        </div>

                        <div>
                            <button onClick={() => handleEdit(data._id)}>Edit</button>
                            <button type="button" onClick={() => handleDelete(data._id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default ManageProjects