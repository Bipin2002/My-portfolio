import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

function ManageAchievements() {
  const [achievementsData, setAchievementsData] = useState({
    achievementname: '',
    achievementimage: null,
    achievementdate: '',
  });
  const [Achievements, setAchievements] = useState([]);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setUserId(decoded.userId);
    }
  }, []);

  const handleChange = (e) => {
    if (e.target.name === 'achievementimage') {
      setAchievementsData({
        ...achievementsData,
        achievementimage: e.target.files[0],
      });
    } else {
      setAchievementsData({
        ...achievementsData,
        [e.target.name]: e.target.value,
      });
    }
  };


  const handleAddachievements = async () => {
    try {

      const formData = new FormData();
      formData.append('achievementname', achievementsData.achievementname);
      formData.append('achievementimage', achievementsData.achievementimage);
      formData.append('achievementdescription', achievementsData.achievementdate);
      await axios.post(`http://localhost:5000/createachievement/${userId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      fetchachievement();
      setAchievementsData({
        achievementname: '',
        achievementimage: null,
        achievementdate: '',
      });
    } catch (error) {
      console.error(error.response.data.error || 'Something went wrong');
    }
  };

  const fetchachievement = useCallback( async () => {
    try {
      const response = await axios.get(`http://localhost:5000/getachievements/${userId}`);
      setAchievements(response.data.achievements);
    } catch (error) {
      console.error(error.response?.data?.error || 'Something went wrong');
    }
  },[userId]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/deletachievements/${id}`);
      fetchachievement();
    } catch (error) {
      console.error(error.response?.data?.error || 'Something went wrong');
    }
  };



  useEffect(() => {
    fetchachievement();
  }, [fetchachievement]);
  return (
    <section className='add_achievements'>
      <div className="add">
        <h1>Add Achievements</h1>
        <form>
          <label htmlFor="achievementname">Name</label>
          <input type="text" name="achievementname" value={achievementsData.achievementname} onChange={handleChange} />
          <label htmlFor="achievementimage">Image URL</label>
          <input type="file" name="achievementimage" onChange={handleChange} />
          <label htmlFor="achievementdate">Date</label>
          <input type="text" name="achievementdate" value={achievementsData.achievementdate} onChange={handleChange} />
          <button type="button" onClick={handleAddachievements}>Add</button>
        </form>
      </div>

      <div className='placeholder'></div>
      <div className="show">
        <h1>achievements</h1>
        {Achievements ? (
          Achievements.map((data) => (
            <div className="info" key={data._id}>
              <div className="image">
                <img src={data.image} alt="" />
                <h2>{data.name}</h2>
                <p>{data.date}</p>
                <button type="button" onClick={() => handleDelete(data._id)}>Delete</button>

              </div>
            </div>
          ))
        ) : (
          <p>Loading achievements...</p>
        )}
      </div>
    </section>

  )
}

export default ManageAchievements