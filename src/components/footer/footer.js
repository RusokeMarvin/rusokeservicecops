import React from 'react'
import './footer.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons'

function Footer() {
  return (
    <div className='footers'>
        <footer>
          <div className='detailfooter'>
          <div>
            <h1>ServiceCops</h1>
            <p>My name is Rusoke Marvin, and I am a passionate Software Developer with a strong drive for innovation and problem-solving. I thrive on leveraging my skills to create impactful solutions and continuously seek opportunities to learn and grow. With a keen interest in technology and a commitment to excellence, I am excited about the opportunity to contribute to ServiceCops and be part of a dynamic, forward-thinking team.</p>
          </div>
          
          </div>
          <div className='copyright'>
          <p>Copyright ©2024 All rights reserved | Rusoke Marvin</p>
          </div>
        </footer>
    </div>
  )
}

export default Footer