import './App.css';
import { Routes, Route } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Home from './Components/Home';
import ProductDetails from './Components/Product/ProductDetails';
import Header from './Components/Layout/Header';
import Footer from './Components/Layout/Footer';
import Login from './Components/User/Login';
import Singup from './Components/User/Singup';
import FrogetPassword from './Components/User/FrogetPassword';
import Gard from './Components/Gard';
import Profile from './Components/User/Profile';
import Cart from './Components/Cart/Cart';
import Shipping from './Components/Cart/Shipping';
import ConfrimOrder from './Components/Cart/ConfrimOrder';
import Payment from './Components/Cart/Payment';
import ListOrder from './Components/Orders/ListOrder';
import OrderDetails from './Components/Orders/OrderDetails';
import Dashbord from './Components/Admin/Dashbord';
import GardAdmin from './Components/GardAdmin';
import NewProduct from './Components/Admin/NewProduct';
import UpdateProduct from './Components/Admin/UpdateProduct';
import OrderListAdmin from './Components/Admin/OrderListAdmin';
import UpdateOrder from './Components/Admin/UpdateOrder';
import UserListAdmin from './Components/Admin/UserListAdmin';
import UpdateUser from './Components/Admin/UpdateUser';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route
          path="/product/:id"
          element={
            <Gard>
              <ProductDetails />
            </Gard>
          }
        />
        <Route
          path="/profile"
          element={
            <Gard>
              <Profile />
            </Gard>
          }
        />
        <Route
          path="/order"
          element={
            <Gard>
              <ListOrder />
            </Gard>
          }
        />
        <Route
          path="/order/:id"
          element={
            <Gard>
              <OrderDetails />
            </Gard>
          }
        />
        <Route
          path="/cart"
          element={
            <Gard>
              <Cart />
            </Gard>
          }
        />
        <Route
          path="/shipping"
          element={
            <Gard>
              <Shipping />
            </Gard>
          }
        />
        <Route
          path="/confrimOrder"
          element={
            <Gard>
              <ConfrimOrder />
            </Gard>
          }
        />
        <Route
          path="/payment"
          element={
            <Gard>
              <Payment />
            </Gard>
          }
        />

        <Route
          path="/dashbord"
          element={
            <GardAdmin>
              <Dashbord />
            </GardAdmin>
          }
        />

        <Route
          path="/product/new"
          element={
            <GardAdmin>
              <NewProduct />
            </GardAdmin>
          }
        />

        <Route
          path="/product/update/:id"
          element={
            <GardAdmin>
              <UpdateProduct />
            </GardAdmin>
          }
        />

        <Route
          path="/dashbord/order"
          element={
            <GardAdmin>
              <OrderListAdmin />
            </GardAdmin>
          }
        />

        <Route
          path="/dashbord/order/:id"
          element={
            <GardAdmin>
              <UpdateOrder />
            </GardAdmin>
          }
        />

        <Route
          path="/dashbord/users"
          element={
            <GardAdmin>
              <UserListAdmin />
            </GardAdmin>
          }
        />

        <Route
          path="/dashbord/user/:id"
          element={
            <GardAdmin>
              <UpdateUser />
            </GardAdmin>
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/forget/password" element={<FrogetPassword />} />
        <Route path="/singup" element={<Singup />} />
        <Route path="*" element={<h1>page not fount</h1>} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
