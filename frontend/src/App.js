import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import DataDisplay from './components/Data';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <DataDisplay/>
      <Footer/>
    </div>
  );
}

export default App;
