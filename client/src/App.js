import { Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext.js";
import { NavTogglesProvider } from "./context/NavTogglesContext.js";

import NavBar from "./components/NavBar/NavBar.js";
import Login from "./components/Login/Login.js";
import Register from "./components/Register/Register.js";
import Logout from "./components/Logout/Logout.js";

import Create from "./components/Admin/Product/Create.js"
import Edit from "./components/Admin/Product/Edit.js";
import Delete from "./components/Admin/Product/Delete.js"

import ProductsLayout from "./components/Products/ProductsLayout.js";
import ProductDetails from "./components/Products/ProductDetails.js";

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
            <Route path="/products/">
              <Route path=":gender" element={<ProductsLayout />} />
              <Route path="details/:productId" element={<ProductDetails />} />
            </Route>
            <Route path="/admin/">
              <Route path="products/create" element={<Create />} />
              <Route path="products/:productId/edit" element={<Edit />} />
              <Route path="products/:productId/delete" element={<Delete />} />
            </Route>
            <Route path="*"  element={<h1>Error Page</h1>}/>
          </Routes>
        </div>
      </div>
    </AuthProvider>
  );
}

export default App;
