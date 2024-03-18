import React, { useEffect, useState } from "react";
import axios from "axios";
import "../style/manageprofile.css";
import { jwtDecode } from "jwt-decode";

function ManageProfile() {
  const [personalData, setPersonalData] = useState({
    profileImage: null,
    firstname: "",
    lastname: "",
    designation: "",
    email: "",
    summary: "",
    phone_no: "",
    address: "",
    messenger: "",
    facebook: "",
    instagram: "",
    linkedin: "",
  });
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setUserId(decoded.userId);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/getData/${userId}`
        );
        const fetchedData = response.data.personalData || {};

        setPersonalData({
          profileImage: fetchedData.image || null,
          firstname: fetchedData.firstname || "",
          lastname: fetchedData.lastname || "",
          designation: fetchedData.designation || "",
          email: fetchedData.email || "",
          summary: fetchedData.summary || "",
          phone_no: fetchedData.contact || "",
          address: fetchedData.address || "",
          messenger: fetchedData.messenger || "",
          facebook: fetchedData.facebook || "",
          instagram: fetchedData.instagram || "",
          linkedin: fetchedData.linkedin || "",
        });
      } catch (error) {
        console.error(error.response?.data?.error || "Something went wrong");
      }
    };

    fetchData();
  }, [userId]);

  const handleChange = (e) => {
    if (e.target.name === "profileImage") {
      const file = e.target.files[0];
      const imagePreviewUrl = URL.createObjectURL(file);
      console.log("Image Preview URL:", imagePreviewUrl); // Debug: Log the image preview URL
      setPersonalData({
        ...personalData,
        profileImage: file,
        imagePreview: imagePreviewUrl,
      });
    } else {
      setPersonalData({
        ...personalData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleAddData = async () => {
    try {
      const formData = new FormData();
      formData.append("profileImage", personalData.profileImage);
      formData.append("firstname", personalData.firstname);
      formData.append("lastname", personalData.lastname);
      formData.append("designation", personalData.designation);
      formData.append("email", personalData.email);
      formData.append("summary", personalData.summary);
      formData.append("phone_no", personalData.phone_no);
      formData.append("address", personalData.address);
      formData.append("messenger", personalData.messenger);
      formData.append("facebook", personalData.facebook);
      formData.append("instagram", personalData.instagram);
      formData.append("linkedin", personalData.linkedin);
      await axios.post(`http://localhost:5000/createData/${userId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="manageprofile">

      <form>
        <div className="manage">
        <div className="pp">
          <label htmlFor="profileImage">Profile Image</label>

          {personalData.imagePreview && (
            <img
              src={personalData.imagePreview}
              alt="Profile Preview"
            />
          )}

          {!personalData.imagePreview && (
            <img src={personalData.profileImage} alt="" />
          )}

          <input
            type="file"
            name="profileImage"
            onChange={handleChange}
            style={{
              color: "transparent"
            }}
            required
          />

        </div>
        <div className="infos">
          <div className="info1">
            <div>
            <label htmlFor="firstname">First Name</label>
            <input type="text" name="firstname" value={personalData.firstname} onChange={handleChange} required />
            </div>
            <div>
            <label htmlFor="lastname">Last Name</label>
            <input type="text" name="lastname" value={personalData.lastname} onChange={handleChange} required />
            </div>
            <div>
            <label htmlFor="phone_no">phone_no</label>
            <input type="text" name="phone_no" value={personalData.phone_no} onChange={handleChange} required />
            </div>
          </div>
          <div className="info1">
            <div>
            <label htmlFor="designation">Designation</label>
            <input type="text" name="designation" value={personalData.designation} onChange={handleChange} required />

            </div>
            <div>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" value={personalData.email} onChange={handleChange} required />

            </div>
            <div>
            <label htmlFor="address">Address</label>
            <input type="text" name="address" value={personalData.address} onChange={handleChange} required />

            </div>
            
           
          </div>
          <div className="summary">
            <label htmlFor="summary">Summary</label>
            <textarea name="summary" value={personalData.summary} onChange={handleChange} required ></textarea>
          </div>


          <div className="links">
            <div>
            <label htmlFor="messenger">Messenger Link</label>
            <input type="text" name="messenger" value={personalData.messenger} onChange={handleChange} required />
            </div>
           <div>
           <label htmlFor="facebook">Facebook Link</label>
            <input type="text" name="facebook" value={personalData.facebook} onChange={handleChange} required />
           </div>
           <div>
           <label htmlFor="instagram">Instagram Link</label>
            <input type="text" name="instagram" value={personalData.instagram} onChange={handleChange} />

           </div>
            <div>
            <label htmlFor="linkedin">Linkedin Link</label>
            <input type="text" name="linkedin" value={personalData.linkedin} onChange={handleChange} required />

            </div>
           

          </div>
        </div>
        </div>

        <button type="button" onClick={handleAddData}>Update</button>
      </form>
    </section>
  );
}

export default ManageProfile;
