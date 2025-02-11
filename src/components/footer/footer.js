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
            <p>My name is Rusoke Marvin, i'm a passionate Software Developer. I love leveraging my skills to solve problems. I'm innovative, eager to learn new things and grow with ServiceCops</p>
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