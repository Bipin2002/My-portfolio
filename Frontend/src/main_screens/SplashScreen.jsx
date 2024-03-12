import React from 'react'
import '../style/splash_screen.css';


function SplashScreen() {
    return (
        <div className='splash'>
            <section id="header1">
                <h2>Portfolio</h2>
                <div>
                    <ul id="navbar1">
                        <li><a href="/">Home</a></li>
                        <li><a href="/">About</a></li>
                        <li><a href="/">Contact</a></li>
                        <li><button ><a href='/Login'>Login</a></button></li>
                        <li><button ><a href='/SignUp'>Signup</a></button></li>

                    </ul>
                </div>

            </section>


            <section id="offer">
                <h2>Portfolio Maker</h2>
                <h1>Student Performance Analytics</h1>
                <p>Your comprehensive school management system, empowers users to seek support, pose questions, and contribute
                    while harnessing advanced features for in-depth student performance analytics.</p>

            </section > 
            <footer class="section-p1">
                <div class="col">
                    <h4>Contacts</h4>
                    <p><strong>Address:</strong>Dakshinkali, Kathmandu</p>
                    <p><strong>Phone:</strong>+977 9840248823</p>
                    <div class="follow">
                        <h4>Follow Us</h4>
                    </div>
                    <div class="icon">
                        <a href="https://www.facebook.com/profile.php?id=100083633439174"><i
                            class="fa-brands fa-facebook"></i></a>
                    </div>
                </div>
                <div class="col">
                    <h4>About</h4>
                    <a href="/">About Us</a>
                    <a href="/">Privacy Policy</a>
                    <a href="/">Terms & Condition</a>
                    <a href="/">Contact Us</a>
                </div>


                <div class="copyright">
                    <p><i class="fa-regular fa-copyright"></i>2023 Bipin: Edu-Plus</p>
                </div>
            </footer>
        </div>



    )
}

export default SplashScreen