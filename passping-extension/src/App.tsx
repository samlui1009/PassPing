import './App.css'
import Menu from './components/Menu';
// import Icon from './assets/passping_icon.png'

function App() {

  return (
    <>
        <div>
            <h1>PassPing</h1>
            <p>Never miss your monthly U-Pass ever again!</p>
            <p>Currently Loading For: </p>
            {/* <Icon></Icon> */}
            <Menu></Menu>
        </div>
    </>
  )
}

export default App
