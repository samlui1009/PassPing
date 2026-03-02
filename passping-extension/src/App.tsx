import './App.css'
import Menu from './components/Menu';
import Header from './components/Header'

// import Icon from './assets/passping_icon.png'

function App() {

//   TODO:  Check on WHY my former solution wasn't working
  const currentMonthName = new Date().toLocaleString('en-US', { month: 'long' });
  const currentYear = new Date().getFullYear();

  const fullDate = currentMonthName + " " + currentYear;

  return (
    <>
        <div>
            <Header></Header>
            <h1 className="ext-name">PassPing</h1>
            <p className="tagline">Never miss your monthly U-Pass  again!</p>
            <p className="load-msg">Currently Loading: </p>
            <p className="full-date">{ fullDate }</p>
            {/* <Icon></Icon> */}
            <Menu></Menu>
        </div>
    </>
  )
}

export default App
