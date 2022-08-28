import { Routes,Route } from 'react-router-dom';

import NavBar from './components/NavBar/NavBar.js'
import Login from './components/Login/Login.js';

function App() {
  return(
    <div id='container'>
      <NavBar /> 
      <div id='main-content' className='mt-10 h-full w-full'>
      <Routes>
        <Route path='/users/'>
            <Route path='login' element={<Login />}/>
            {/* <Route path='register' element={<Login />}/>
            <Route path='logout' element={<Login />}/> */}
        </Route>
      </Routes>
      </div>
    </div>
  )
}

export default App;
