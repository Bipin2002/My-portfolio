import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Manageworks() {
  const [workData, setWorkData] = useState({
    workname: '',
    workimage: null,
    workdescription: '',
  });
  const [works, setworks] = useState([]);
  const [editingWorkId, setEditingWorkId] = useState(null);


  const handleChange = (e) => {
    if (e.target.name === 'workimage') {
      setWorkData({
        ...workData,
        workimage: e.target.files[0],
      });
    } else {
      setWorkData({
        ...workData,
        [e.target.name]: e.target.value,
      });
    }
  };


  const handleAddwork = async () => {
    try {
      const formData = new FormData();
      formData.append('workname', workData.workname);
      formData.append('workimage', workData.workimage);
      formData.append('workdescription', workData.workdescription);

      if (editingWorkId) {
        await axios.put(`http://localhost:5000/editwork/${editingWorkId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });


      } else {
        await axios.post('http://localhost:5000/createWorks', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });


      }
      fetchworks();
      setWorkData({
        workname: '',
        workimage: '',
        workdescription: '',
      });
      setEditingWorkId(null);

    } catch (error) {
      console.error(error.response.data.error || 'Something went wrong');
      console.log("hi")
    }
  };

  const handleEdit = (id) => {
    const workToEdit = works.find((work) => work._id === id);
    setWorkData({
      workname: workToEdit.name,
      workimage: workToEdit.image,
      workdescription: workToEdit.description,
    });
    setEditingWorkId(id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/deletework/${id}`);
      fetchworks();
    } catch (error) {
      console.error(error.response?.data?.error || 'Something went wrong');
    }
  };

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
    <section className='add_works'>
      <div className="add">
        <h1> {editingWorkId ? 'Edit' : 'Add'}</h1>
        <form>
          <label htmlFor="workname">Name</label>
          <input type="text" name="workname" value={workData.workname} onChange={handleChange} />
          <label htmlFor="workimage">Image</label>
          <input type="file" name="workimage" onChange={handleChange} />
          <label htmlFor="workdescription">Description</label>
          <input type="text" name="workdescription" value={workData.workdescription} onChange={handleChange} />
          <button type="button" onClick={handleAddwork}>
            {editingWorkId ? 'Update' : 'Add'}
          </button>
        </form>
      </div>

      <div className='placeholder'></div>
      <div className="show">
        <h1>Works</h1>
        {works ? (
          works.map((data) => (
            <div className="info" key={data._id}>
              <div className="image">
                <img src={data.image} alt="" />
              </div>
              <div className="des">
                <h2>{data.name}</h2>
                <p>{data.description}</p>
              </div>
              <div>
                <button onClick={() => handleEdit(data._id)}>Edit</button>
                <button type="button" onClick={() => handleDelete(data._id)}>Delete</button>
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

export default Manageworks