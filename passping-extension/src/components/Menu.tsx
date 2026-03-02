import { IoMdCheckmarkCircle } from "react-icons/io";
import { FaBell, FaExternalLinkAlt } from "react-icons/fa";

import "../stylesheets/Menu.css";

function Menu() {

    return (
      <>
          <div className="menu-div">
            <button className="menu-btn"><IoMdCheckmarkCircle className="icon"></IoMdCheckmarkCircle>Mark as Loaded</button>
            <button className="menu-btn"><FaExternalLinkAlt className="icon"></FaExternalLinkAlt>Open U-Pass Website</button>
            <button className="menu-btn"><FaBell className="icon"></FaBell>Remind Me Later</button>
          </div>
      </>
    )
  }
  
  export default Menu
  