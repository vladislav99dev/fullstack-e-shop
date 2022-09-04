import { Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext.js";
import { NavTogglesProvider } from "./context/NavTogglesContext.js";

import NavBar from "./components/NavBar/NavBar.js";
import Login from "./components/Login/Login.js";
import Register from "./components/Register/Register.js";
import Logout from "./components/Logout/Logout.js";

import Create from "./components/Admin/Product/Create.js"


function App() {
  return (
    <AuthProvider>
      <div id="container">
        <NavTogglesProvider>
          <NavBar />
        </NavTogglesProvider>
        <div id="main-content" className="mt-10 h-full w-full">
          <Routes>
            <Route path="/users/">
              <Route path="login" element={<Login />} />
              <Route path='register' element={<Register />}/>
              <Route path='logout' element={<Logout />}/>
            </Route>
            <Route path="/admin/">
              <Route path="products/create" element={<Create />} />
            </Route>
          </Routes>
        </div>
      </div>
    </AuthProvider>
  );
}

export default App;
