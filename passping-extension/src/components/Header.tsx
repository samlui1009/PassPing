import { MdOutlineSettings } from "react-icons/md";

import '../stylesheets/Header.css';

type HeaderProps = {
    goToSettings: () => void
  }

function Header({goToSettings} : HeaderProps) {

    return (
      <>
          <div className="header-div">
            <p className="header-tagline">Load your U-Pass!</p>
            <button className="settings-btn" onClick={goToSettings}><MdOutlineSettings className="settings-icon"></MdOutlineSettings>Settings</button>
          </div>
      </>
    )
  }
  
  export default Header