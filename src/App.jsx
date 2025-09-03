import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Shop from "./Pages/Shop";
import Blog from "./Pages/Blog";
import Contact from "./Pages/Contact";
import Carts from "./Pages/Carts";
import Supports from "./Pages/Supports";
import Accounts from "./Pages/Accounts";
import Collection from "./components/Category/Category";
import Barcelona from './components/Club/Football/Barcelona';
import Chelsea from './components/Club/Football/Chelsea';
import ParisSaintGermain from './components/Club/Football/PSG';
import Warriors from './components/Club/Basketball/Warriors';
import Lakers from './components/Club/Basketball/Lakers';
import Bulls from './components/Club/Basketball/Bulls';
import Tennis from './components/Club/Tennis/Tennis';
import Cricket from './components/Club/Cricket/Cricket';
import Fanart from './components/Club/Fanart/Fanart';
import Dashboard from "./components/Dashboard/Dashboard";
import AdminLayout from "./components/AdminLayout/AdminLayout";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";
import Users from "./components/AdminDashboard/Users";
import AdminProducts from "./components/AdminDashboard/AdminProducts";
import AdminOrders from "./components/AdminDashboard/AdminOrders"; // if you create it later
// import AdminInventory from "./components/AdminDashboard/AdminInventory"; // optional
import AdminAnalytics from "./components/AdminAnalytics/AdminAnalytics"; // optional
import { UserProvider } from "./Context/UserContext";
import OrderList from "./components/Orders/OrderList.jsx";
import Checkout from "./components/Checkout/Checkout";
import Profile from "./components/AccountSettings/Profile.jsx";
import ChangePassword from "./components/AccountSettings/ChangePassword.jsx";
import AccountSettings from "./components/AccountSettings/AccountSettings";
import ForgotPassword from "./components/Account/ForgotPassword";




// function App() {
//   return (
//     <UserProvider>
//       <Router>
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/shop" element={<Shop />} />
//           <Route path="/blog" element={<Blog />} />
//           <Route path="/contact" element={<Contact />} />
//           <Route path="/collections" element={<Collection />} />
//           <Route path="/Supports" element={<Supports />} />
//           <Route path="/collections/football/barcelona" element={<Barcelona />} />
//           <Route path="/collections/football/chelsea" element={<Chelsea />} />
//           <Route path="/collections/football/psg" element={<ParisSaintGermain />} />
//           <Route path="/collections/basketball/warriors" element={<Warriors />} />
//           <Route path="/collections/basketball/Lakers" element={<Lakers />} />
//           <Route path="/collections/basketball/Bulls" element={<Bulls />} />
//           <Route path="/collections/tennis" element={<Tennis />} />
//           <Route path="/collections/cricket" element={<Cricket />} />
//           <Route path="/collections/Fanart" element={<Fanart />} />
//           <Route path="/cart" element={<Carts />} />
//           <Route path="/account" element={<Accounts />} />

//           <Route path="/dashboard" element={<Dashboard />} />
//           <Route path="/admin" element={<AdminLayout />} />
//           <Route path="/admin-panel" element={<AdminDashboard />} />
//           <Route path="/admin/users" element={<Users />} />
//           <Route path="/admin/products" element={<AdminProducts />} />
//           <Route path="/admin/orders" element={<AdminOrders />} />
//           <Route path="/admin/analytics" element={<AdminAnalytics />} />
//           {/* <Route path="/admin/inventory" element={<AdminInventory />} />
//           <Route path="/admin/analytics" element={<AdminAnalytics />} /> */}
//           <Route path="/orders" element={<OrderList />} />
//           <Route path="/checkout" element={<Checkout />} />
//           {/* <Route path="/account/settings" element={<AccountSettings />} /> */}
//           <Route path="/account/settings" element={<AccountSettings />} />  {/* Profile + Password together */}
//           <Route path="/account/profile" element={<Profile />} />           {/* Profile only */}
//           <Route path="/account/password" element={<ChangePassword />} />   {/* Password only */}
//           <Route path="/forgot-password" element={<ForgotPassword />} />



//         </Routes>
//       </Router>
//     </UserProvider>
//   );
// }

// export default App;

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/collections" element={<Collection />} />
          <Route path="/Supports" element={<Supports />} />
          <Route path="/collections/football/barcelona" element={<Barcelona />} />
          <Route path="/collections/football/chelsea" element={<Chelsea />} />
          <Route path="/collections/football/psg" element={<ParisSaintGermain />} />
          <Route path="/collections/basketball/warriors" element={<Warriors />} />
          <Route path="/collections/basketball/Lakers" element={<Lakers />} />
          <Route path="/collections/basketball/Bulls" element={<Bulls />} />
          <Route path="/collections/tennis" element={<Tennis />} />
          <Route path="/collections/cricket" element={<Cricket />} />
          <Route path="/collections/Fanart" element={<Fanart />} />
          <Route path="/cart" element={<Carts />} />
          <Route path="/account" element={<Accounts />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/orders" element={<OrderList />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/account/settings" element={<AccountSettings />} />
          <Route path="/account/profile" element={<Profile />} />
          <Route path="/account/password" element={<ChangePassword />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Admin routes nested under AdminLayout */}
          <Route path="/admin" element={<AdminLayout />}>
            {/* Default dashboard when visiting /admin */}
            <Route index element={<AdminDashboard />} />

            {/* Other admin pages */}
            <Route path="users" element={<Users />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="analytics" element={<AdminAnalytics />} />
            {/* <Route path="inventory" element={<AdminInventory />} /> */}
          </Route>
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
