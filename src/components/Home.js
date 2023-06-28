import React, { useState, useEffect }from 'react'
import Calender from './Calender'
// import {Link} from 'react-router-dom';
// import LoginPage from './LoginPage'
// import Navbar from './Navbar';
export default function Home(){
    const [shouldRender, setShouldRender] = useState('true');

    useEffect(() => {
      const handleResize = () => {
        if (window.innerWidth < 1199) {
          setShouldRender(false);
        } else {
          setShouldRender(true);
        }
      };

      handleResize();
  
      window.addEventListener('resize', handleResize);
  
    })
    return(
        <>

               <div className="Home " id='home'>
                  
               </div>
                   {/* <section className="Testimonials">
                       <div className='section-title'>
                             <h1>Testimonials</h1>
                             <div className='underline'></div>
                      </div>
                      <div className='cards-container'>
                      <figure class="cards">
                            <blockquote>Calvin: Sometimes when I'm talking with others,
                               my words can't keep up with my thoughts. I wonder why we think faster
                                than we speak. Hobbes: Probably so we can think twice. </blockquote>
                              <div class="author">
                                   <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sq-sample1.jpg" alt="sq-sample1"/>
                                   <h5>Pelican Steve </h5>
                              </div>
                      </figure>
                      <figure class="cards">
                            <blockquote>Calvin: Sometimes when I'm talking with others,
                               my words can't keep up with my thoughts. I wonder why we think faster
                                than we speak. Hobbes: Probably so we can think twice. </blockquote>
                              <div class="author">
                                   <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sq-sample1.jpg" alt="sq-sample1"/>
                                   <h5>Pelican Steve </h5>
                              </div>
                      </figure>
                      <figure class="cards">
                            <blockquote>Calvin: Sometimes when I'm talking with others,
                               my words can't keep up with my thoughts. I wonder why we think faster
                                than we speak. Hobbes: Probably so we can think twice. </blockquote>
                              <div class="author">
                                   <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sq-sample1.jpg" alt="sq-sample1"/>
                                   <h5>Pelican Steve </h5>
                              </div>
                      </figure>

                      </div>
                    
                   <div className='section-title'>
                             <h1>Contact us</h1>
                             <div className='underline'></div>
                      </div>
                   </section> */}
        </>
    )
}