import React,{useEffect,useState} from "react";
import { Link} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default function NavbarIcons(props) {
    const { icon, element, link, onClick } = props;
    const [shouldRender, setShouldRender] = useState(true);
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
  
      // Clean up the event listener on unmount
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);
    const handleClick = () => {
       if(onClick)
        onClick();
      
      
    };

  return (
    
    <div class="Navbar-container">
      
      
        <Link className="icontext" to={link} onClick={handleClick}>
        <div class="Navbar-icons">
          

        <FontAwesomeIcon width={25} onClick={handleClick} icon={icon} size="1x" />
          
          <strong style={{paddingLeft:'25px'}}>{shouldRender&&element}</strong>
      </div>
        </Link>
      
    </div>
  );
}
