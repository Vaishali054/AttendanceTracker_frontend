import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope,
         faHouse,
         faFile,
         faUser,
         faBlog } from '@fortawesome/free-solid-svg-icons'


  export default function Icons() {

   
    const handleClickAbout= () => {
      const element =document.getElementById('about')
      element.scrollIntoView({behavior: 'smooth'});
    };
    const handleClickHome= () => {
      const element =document.getElementById('home')
      element.scrollIntoView({behavior: 'smooth'});
    };
    const handleClickResume= () => {
      const element =document.getElementById('resume')
      element.scrollIntoView({behavior: 'smooth'});
    };
    
    
    return (
      <div class="social-container">
  
        
          <div className="social-container-icons">
          <FontAwesomeIcon  icon={faHouse} size="1x" /><p onClick={handleClickHome} class="icontext">Home</p>
          </div>

        
        
          <div className="social-container-icons">
          <FontAwesomeIcon icon={faUser} size="1x" /><p onClick={handleClickAbout} class="icontext">About</p>
          </div>
        
          <div className="social-container-icons">
          <FontAwesomeIcon icon={faFile} size="1x" /><p onClick={handleClickResume} class="icontext">Resume</p>
            </div>
        
          <a href="" className="social-container-icons">
          <FontAwesomeIcon icon={faBlog} size="1x" /><p class="icontext">Blogs </p>
            </a>
        
       
        
        
          <a href="mailto: vaishali3837@gmail.com" className="social-container-icons">
          <FontAwesomeIcon icon={faEnvelope} size="1x" /><p class="icontext">Contact </p>
            </a>
        
        
      </div>
    );
  }