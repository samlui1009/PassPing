import "../stylesheets/Home.css";

import Menu from "../components/Menu";
import Header from "../components/Header";

type HomeProps = {
  goToSettings: () => void;
};

function Home({ goToSettings }: HomeProps) {

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  const currentMonthName = currentDate.toLocaleString("en-US", {
    month: "long",
    timeZone: "America/Los_Angeles"
  });

  const nextMonthDate = currentDate;
  nextMonthDate.setMonth(nextMonthDate.getMonth() + 1);
  const nextMonthName = nextMonthDate.toLocaleString("en-US", {
    month: "long",
    timeZone: "America/Los_Angeles"
  });

  const currentMonth = currentMonthName + " " + currentYear;
  const nextMonth = nextMonthName + " " + currentYear;

  return (
    <>
      <div>
        <Header goToSettings={goToSettings}></Header>
        <div className="divider"></div>
        <div className="date-divider-ctn">
            <div className="date-ctn">
                <span className="load-msg">This Months' Pass: </span>
                <span className="full-date">{currentMonth}</span> 
            </div>
            <div className="date-ctn">
                <span className="load-msg">Next Months' Pass: </span>
                <span className="next-date">{nextMonth}</span>
            </div>
        </div>
        <Menu></Menu>

      </div>
    </>
  );
}

export default Home;
