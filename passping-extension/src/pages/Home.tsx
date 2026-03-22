import "../stylesheets/Home.css";
import Menu from "../components/Menu";
import Header from "../components/Header";

import Icon from "../assets/passping_icon.png";

type HomeProps = {
  goToSettings: () => void;
};

function Home({ goToSettings }: HomeProps) {

  // Displays the current month and year in the format "Month Year", e.g. "September 2024", which will be displayed on the homepage
  const currentMonthName = new Date().toLocaleString("en-US", {
    month: "long",
  });
  const currentYear = new Date().getFullYear();
  const fullDate = currentMonthName + " " + currentYear;

  // Displays the next month and year in the format "Month Year", e.g. "October 2024", which will be used to determine if the U-Pass for the next month has been loaded   
  const nextMonthDate = new Date();
  nextMonthDate.setMonth(nextMonthDate.getMonth() + 1);
  const nextMonthName = nextMonthDate.toLocaleString("en-US", {
    month: "long",
  });
  const nextMonth = nextMonthName + " " + currentYear;

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
        <div className="date-divider-ctn">
            <div className="date-ctn">
                <span className="load-msg">Active Pass: </span>
                <span className="full-date">{fullDate}</span> 
            </div>
            <div className="date-ctn">
                <span className="load-msg">Pending Pass: </span>
                <span className="full-date">{nextMonth}</span>
            </div>
        </div>
        <Menu></Menu>

      </div>
    </>
  );
}

export default Home;
