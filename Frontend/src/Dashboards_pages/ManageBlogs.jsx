import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ManageBlogs() {
    const [blogData, setBlogData] = useState({
        blogname: '',
        blogimage: null,
        blogdescription: '',
        blogUrl: '',
    });
    const [blogs, setblogs] = useState([]);
    const [editingBlogId, setEditingBlogId] = useState(null);


    const handleChange = (e) => {
        if (e.target.name === 'blogimage') {
            setBlogData({
                ...blogData,
                blogimage: e.target.files[0],
            });
        } else {
            setBlogData({
                ...blogData,
                [e.target.name]: e.target.value,
            });
        }
    };

    const handleAddblog = async () => {
        try {
            const formData = new FormData();
            formData.append('blogname', blogData.blogname);
            formData.append('blogimage', blogData.blogimage);
            formData.append('blogdescription', blogData.blogdescription);
            formData.append('blogUrl', blogData.blogUrl);

            if (editingBlogId) {
                await axios.put(`http://localhost:5000/editblog/${editingBlogId}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });


            } else {
                await axios.post('http://localhost:5000/createblogs', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });


            }
            fetchBlogs();
            setBlogData({
                blogname: '',
                blogimage: 'null',
                blogdescription: '',
                blogUrl: '',
            });

            setEditingBlogId(null);

        } catch (error) {
            console.error(error);
        }
    };

    const handleEdit = (id) => {
        const blogToEdit = blogs.find((blog) => blog._id === id);
        setBlogData({
            blogname: blogToEdit.name,
            blogimage: blogToEdit.image,
            blogdescription: blogToEdit.description,
            blogUrl: blogToEdit.url,
        });
        setEditingBlogId(id);
    };

    const fetchBlogs = async () => {
        try {
            const response = await axios.get('http://localhost:5000/getblogs');
            setblogs(response.data.blogs);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/deleteblog/${id}`);
            fetchBlogs();
        } catch (error) {
            console.error(error.response?.data?.error || 'Something went wrong');
        }
    };



    useEffect(() => {
        fetchBlogs();
    }, []);
    return (
        <section className='add_blogs'>
            <div className="add">
                <h1>{editingBlogId ? 'Edit' : 'Add'}</h1>
                <form>
                    <label htmlFor="blogname">blog Name</label>
                    <input type="text" name="blogname" value={blogData.blogname} onChange={handleChange} />
                    <label htmlFor="blogimage">blog Image URL</label>
                    <input type="file" name="blogimage" onChange={handleChange} />
                    <label htmlFor="blogdescription">Description</label>
                    <input type="text" name="blogdescription" value={blogData.blogdescription} onChange={handleChange} />
                    <label htmlFor="blogUrl">blog URL</label>
                    <input type="text" name="blogUrl" value={blogData.blogUrl} onChange={handleChange} />
                    <button type="button" onClick={handleAddblog}>
                        {editingBlogId ? 'Update' : 'Add'}
                    </button>
                </form>
            </div>

            <div className='placeholder'></div>
            <div className="show">
                <h1>BLOGS</h1>
                {blogs ? (
                    blogs.map((data) => (
                        <div className="info">
                            <div className="image">
                                <img src={data.image} alt="" />
                            </div>
                            <div className="des">
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
                    ))
                ) : (
                    <p>Loading blogs...</p>
                )}
            </div>
        </section>
    )
}

export default ManageBlogs