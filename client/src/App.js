import { Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext.js";
import { LocalProductsProvider } from "./context/LocalProductsContext.js";
import { NavTogglesProvider } from "./context/NavTogglesContext.js";
import { ModalsProvider } from "./context/ModalsContext.js";

import NavBar from "./components/NavBar/NavBar.js";

import Home from "./components/Home/Home.js"

import Login from "./components/Login/Login.js";
import Register from "./components/Register/Register.js";
import Logout from "./components/Logout/Logout.js";

import Create from "./components/Admin/Product/Create.js"
import Edit from "./components/Admin/Product/Edit.js";
import Delete from "./components/Admin/Product/Delete.js"

import ProductsLayout from "./components/Products/Layout/ProductsLayout.js";
import ProductDetails from "./components/Products/ProductDetails.js";

import ErrorPage from "./components/ErrorPage.js";
import Checkout from "./components/Checkout.js";

function App() {
  return (
    <AuthProvider>
      <ModalsProvider>
        <NavTogglesProvider>
          <LocalProductsProvider>
            <div id="container">
                <NavBar />
              <div id="main-content" className="mt-10 h-full w-full">
                <Routes>

                  <Route path="/home" element={<Home/>}/>

                  <Route path="/users/">
                    <Route path="login" element={<Login />} />
                    <Route path='register' element={<Register />}/>
                    <Route path='logout' element={<Logout />}/>
                  </Route>

                  <Route path="/products/">
                    <Route path=":gender" element={<ProductsLayout />} />
                    <Route path=":gender/details/:productId" element={<ProductDetails />} />
                  </Route>

                  <Route path="/order/">
                    <Route path="checkout" element={<Checkout />} />
                  </Route>

                  <Route path="/admin/">
                    <Route path="products/create" element={<Create />} />
                    <Route path="products/:productId/edit" element={<Edit />} />
                    <Route path="products/:productId/delete" element={<Delete />} />
                  </Route>

                  <Route path="*"  element={<ErrorPage/>} />
                </Routes>
              </div>
            </div>
          </LocalProductsProvider>
        </NavTogglesProvider>
      </ModalsProvider>
    </AuthProvider>
  );
}

export default App;
