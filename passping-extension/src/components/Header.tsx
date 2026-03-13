import { MdOutlineSettings } from "react-icons/md";
import '../stylesheets/Header.css';

function Header() {

    return (
      <>
          <div className="header-div">
            <p className="header-tagline">Load your U-Pass!</p>
            <button className="settings-btn"><MdOutlineSettings className="settings-icon"></MdOutlineSettings>Settings</button>
          </div>
      </>
    )
  }
  
  export default Header