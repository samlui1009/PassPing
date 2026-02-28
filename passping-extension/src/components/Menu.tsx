import { IoMdCheckmarkCircle } from "react-icons/io";
import { FaBell, FaExternalLinkAlt } from "react-icons/fa";

import "../stylesheets/Menu.css";

function Menu() {

    return (
      <>
          <div className="menu-div">
            <button className="menu-btn"><IoMdCheckmarkCircle></IoMdCheckmarkCircle>Mark as Loaded</button>
            <button className="menu-btn"><FaExternalLinkAlt></FaExternalLinkAlt>Open U-Pass Website</button>
            <button className="menu-btn"><FaBell></FaBell>Remind Me Later</button>
          </div>
      </>
    )
  }
  
  export default Menu
  