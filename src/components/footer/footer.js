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
            <h1>SHOP APP</h1>
            <p>SHOP APP, is here to serve you. No more hassles SHOP APP is ready to deliver any product with just a few clicks. SHOP APP allows you to buy any products regardless of the busy schedules you may have </p>
          </div>
          <div>
            <h1>Quick Links</h1>
            <ul>
              <li>
                <a href='#'>Home</a>
              </li>
              <li>
              <a href='#'>Blog</a>
              </li>
              <li>
              <a href='#'>Gallery</a>
              </li>
              <li>
              <a href='#'>FAQs</a>
              </li>
            </ul>
          </div>
          <div>
            <h1>Social Media</h1>
            <FontAwesomeIcon className='logos' icon={faFacebook}/>
            <FontAwesomeIcon className='logos' icon={faTwitter}/>
            <FontAwesomeIcon className='logos' icon={faInstagram}/>
          </div>
          <div>
          <h1>Subscribe Newsletter</h1>
          <input type='email' placeholder='Enter Email'/>
          <button>Send</button>
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