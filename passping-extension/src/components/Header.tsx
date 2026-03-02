import { MdOutlineSettings } from "react-icons/md";
import '../stylesheets/Header.css';

function Header() {

    return (
      <>
          <div className="header-div">
            <p>Load your U-Pass!</p>
            <button><MdOutlineSettings></MdOutlineSettings>Settings</button>
          </div>
      </>
    )
  }
  
  export default Header