
import React from 'react';
import '../style/Portfolio.css';
import Home from '../portfolioSection/Home';
import MyProject from '../portfolioSection/MyProject';
import Blogs from '../portfolioSection/Blogs';
import Experience from '../portfolioSection/Experience';
import Achievements from '../portfolioSection/Achievements';
import AboutMe from '../portfolioSection/AboutMe';

function Portfolio() {
    return (
        <div>
            <div className="nav">
            
                <h1>Portfolio</h1>
          
                

                <ul>
                    <li><a href="#body">Home</a></li>
                    <li><a href="#projects">My Projects</a></li>
                    <li><a href="#blogs">My Blogs</a></li>
                    <li><a href="#Experience">Experience</a></li>
                    <li><a href="#certificates">Achievements</a></li>
                    <li><a href="#about">About Me</a></li>
                </ul>
                <div className='button'>
                    <a href="https://www.messenger.com/t/100012615256776"><button>Let's Talk</button></a>

                </div>

            </div>
            <Home />
            <MyProject />
            <Blogs />
            <Experience />
            <Achievements />
            <AboutMe />
            <footer id='about' className='about'>
            <div className="info">
                <h2>Bipin Nagarkoti</h2>
                <p>As an IT student, I'm passionate about technology and eager to expand my skills in software development, design, and project management. I thrive on collaborating with others to contribute to innovative projects and look forward to a successful career in the IT industry. Continuous learning drives me to stay ahead in this everevolving field. Excited for the journey ahead!</p>
                <h4>Contact: +977-9840248823</h4>
                <h4>e-mail: nagarkotibipin07@gmail.com</h4>
                <h4>Address: dakshinkali-2, Kathmandu</h4>
                <div className='socials'>
                    <ul>
                        <li><a href="https://www.instagram.com/bipin_2058/"><img src="Instagram.png" alt="" /></a></li>
                        <li><a href="https://www.facebook.com/Bipin2002/"><img src="facebook.png" alt="" /></a></li>

                        <li><a href="https://www.linkedin.com/in/bipin-nagarkoti-28826a226/"><img src="Linked in.png" alt="" /></a></li>

                    </ul>
                </div>
            </div>

            <div className="feedback">
                <h2>Feedback</h2>
                <label htmlFor="email"> Email Address</label>
                <input type="email"  />
                <label htmlFor="message">Message</label>
                <input type="text"  />
                <button>Send</button>

            </div>

        </footer>
        </div>
    );
}

export default Portfolio

