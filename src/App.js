import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Home } from './pages/Home';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SignIn } from './pages/SignIn';
import {useState} from 'react';


function App() {
  const [user,setUser] = useState(null);

  return (
    <div className='App'>
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home user = {user}/>} />
          <Route path="/explore" element={<Home/>} />
          <Route path="/account" element = {<SignIn userHandler = {setUser}/>}/>
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;