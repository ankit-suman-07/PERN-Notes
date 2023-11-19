import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthDetails } from './use-context/AuthDetails';

import Home from './home-page/Home';
import Login from './login-page/Login';



function App() {

  return (
    <AuthDetails>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </AuthDetails>
  );
}

export default App;
