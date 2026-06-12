import { MdOutlineSettings } from "react-icons/md";
import Icon from "../assets/passping_icon.png";

import "../stylesheets/Header.css";

type HeaderProps = {
  goToSettings: () => void;
};

function Header({ goToSettings }: HeaderProps) {
  return (
    <>
      <div className="header-div">
        <p className="header-tagline">
          <img className="logo" src={Icon}></img> &nbsp; PassPing
        </p>
        <button className="settings-btn" onClick={goToSettings}>
          <MdOutlineSettings className="settings-icon"></MdOutlineSettings>
          Settings
        </button>
      </div>
    </>
  );
}

export default Header;
