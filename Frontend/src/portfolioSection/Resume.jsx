import React from 'react'
import '../style/resume.css';


function Resume() {
  return (
    <section className='resume'>
        <div className='info1'>
            <div className='image_container'>
                <img src="" alt="" />
            </div>
            <div>
                <div className='summary'>
                    <h5>Summary</h5>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum quae repellat quia in eum officia vitae, ducimus explicabo vel iusto est neque sint nihil. Neque quam reiciendis laboriosam iusto doloremque?</p>
                    
                </div>
                <div className='hello1'>
                    <div className='education'>
                        <h5>Education</h5>
                    </div>
                    <div className="hobbies">
                        <h5>Hobbies</h5>
                    </div>
                    <div className="language">
                        <h5>Language</h5>
                    </div>
                </div>
            </div>
        </div>
        <div className='info2'>
            <div className='experience'>
                <h3>Experience</h3>
            </div>
            <div className='software_skills'>
                <h5>Software Skills</h5>
            </div>
            <div className='skills'>
                <div className='design_skills'>
                    <h5>Desigining Skills</h5>
                </div>
                <div className='soft_skills'>
                    <h5>Soft Skills</h5>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Resume