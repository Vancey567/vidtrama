import './App.css';
import { Routes, Route } from 'react-router-dom';


// Custom Components
import Login from './components/Login/Login';
import Register from './components/Register/Register';
// import Videos from './components/Videos/Videos';

function App() {
  return (
      <div>
        <Routes>
          <Route path='' element={ <Login/> } />
          <Route path='/login' element={ <Login/> } />
          <Route path='/register' element={ <Register /> } />
          {/* <Route path='/videos' element={ <Videos /> } /> */}
        </Routes>
      </div>
  );
}

export default App;
