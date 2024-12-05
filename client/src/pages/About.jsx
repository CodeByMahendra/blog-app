import React from 'react'
import Navbar from '../components/Navbar'

const About = () => {
  return (
<div className='about'>

<Navbar />

  <div className='about-1'>
  <h1>About Us</h1>
  </div>

<div className='about-2'>

  <img src='/about.png' alt='about-img' />

  <div className='abt-pt1'>
  <p>This is a great way to shine a line on the entire organization and embody a truly collaborative mindset. Instead of focusing solely on the founders, businesses can highlight the team that powers the product daily and makes the magic happen</p>

  </div>

  <div className='abt-pt2'>


  <p>This high-level approach to an About Us page places the primary focus on the products’ benefits with a secondary focus on the team. If your product is complex, this may be an approach that you should consider.</p>
  </div>
</div>
</div> 
 )
}

export default About