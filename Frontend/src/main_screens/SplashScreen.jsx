import React from 'react'
import '../style/splash_screen.css';
import Login from './Login';
import {Link, Route, Routes } from 'react-router-dom';
import SignUp from './SignUp';



function SplashScreen() {
    return (
        <div className='splash'>
            <section id="header1">
                <h2>Portfolio</h2>
                {/* <div>
                    <ul id="navbar1">
                        <li><a href="/">Home</a></li>
                        <li><a href="/">About</a></li>
                        <li><a href="/">Contact</a></li>
                        <li><button><Link to="/signup">Signup</Link></button></li>
                    </ul>
                </div> */}

            </section>

            <div className="body_container">
                <section id="offer">
                    <h2>Portfolio Maker</h2>
                    <h1>Generate Portfolio here.</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae cupiditate omnis nulla in quae inventore unde quod repellat ex aperiam veritatis aspernatur tempore dolorem, minima eum. Fugiat nihil ab quo.</p>

                </section >

                <section className='auth'>
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/signup" element={<SignUp />}></Route>
                    </Routes>
                </section>


            </div>


        </div>



    )
}

export default SplashScreen