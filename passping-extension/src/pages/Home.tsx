import "../stylesheets/Home.css";
import Menu from "../components/Menu";
import Header from "../components/Header";

import Icon from "../assets/passping_icon.png";

type HomeProps = {
  goToSettings: () => void;
};

function Home({ goToSettings }: HomeProps) {

  const currentMonthName = new Date().toLocaleString("en-US", {
    month: "long",
  });
  const currentYear = new Date().getFullYear();

  const fullDate = currentMonthName + " " + currentYear;

  return (
    <>
      <div>
        <Header goToSettings={goToSettings}></Header>
        <div className="divider"></div>
        <h1 className="ext-name">PassPing</h1>
        <p className="tagline">Never miss your monthly U-Pass again!</p>
        <div className="bus-ctn">
          <img className="logo" src={Icon}></img>
        </div>
        <div className="date-ctn">
          <p className="load-msg">Currently Loading: </p>
          <p className="full-date">{fullDate}</p>
        </div>
        <Menu></Menu>
        <button
          onClick={() => {
            chrome.runtime.sendMessage({ type: "TEST_NOTIFICATION" });
          }}
        >
          Test Notification
        </button>
      </div>
    </>
  );
}

export default Home;
