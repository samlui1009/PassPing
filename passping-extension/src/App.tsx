import './App.css'
import Menu from './components/Menu';
import Header from './components/Header'

// import Icon from './assets/passping_icon.png'

function App() {

  const currentMonthNumber = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  const fullDate = currentMonthNumber + "/" + currentYear;

  return (
    <>
        <div>
            <Header></Header>
            <h1 className="ext-name">PassPing</h1>
            <p className="tagline">Never miss your monthly U-Pass ever again!</p>
            <p className="current-month">Currently Loading For: { fullDate }</p>
            {/* <Icon></Icon> */}
            <Menu></Menu>
        </div>
    </>
  )
}

export default App
