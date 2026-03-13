import { IoMdCheckmarkCircle } from "react-icons/io";
import { FaBell, FaExternalLinkAlt } from "react-icons/fa";

import "../stylesheets/Menu.css";

function Menu() {
  const handleClickToUpassWebsite = (url: string | URL | undefined) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <div className="menu-div">
        <button className="menu-btn">
          <div className="icon-div">
            <IoMdCheckmarkCircle className="icon"></IoMdCheckmarkCircle>
          </div>
          Mark as Loaded
        </button>
        <button
          className="menu-btn"
          onClick={() =>
            handleClickToUpassWebsite("https://upassbc.translink.ca/")
          }
        >
          <FaExternalLinkAlt className="icon"></FaExternalLinkAlt>Open U-Pass
          Website
        </button>
        <button className="menu-btn">
          <FaBell className="icon"></FaBell>Remind Me Later
        </button>
      </div>
    </>
  );
}

export default Menu;
