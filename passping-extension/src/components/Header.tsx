import { MdOutlineSettings } from "react-icons/md";
import { FaBus } from "react-icons/fa";

import '../stylesheets/Header.css';

type HeaderProps = {
    goToSettings: () => void
  }

function Header({goToSettings} : HeaderProps) {

    return (
      <>
          <div className="header-div">
            <p className="header-tagline"><FaBus className="header-logo"></FaBus> Load your U-Pass!</p>
            <button className="settings-btn" 
                    onClick={goToSettings}><MdOutlineSettings className="settings-icon"></MdOutlineSettings>Settings
            </button>
          </div>
      </>
    )
  }
  
  export default Header