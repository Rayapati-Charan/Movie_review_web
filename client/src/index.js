import React from 'react';

import ReactDOM from 'react-dom/client';
import Movies from './Component/movies'
import Home from './Layout/Home'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admindash from './Layout/admindash'
import AddMovie from './Layout/admin/addmovie'
import AdminReview from './Layout/admin/adminreview'
import Signup from './Component/signup'
import UserLogin from './Component/userlogin'
import Footer from './Component/footer'
import Watchlist from './Layout/watchlist';
import { AuthProvider } from './DataProvider';
import UserMoive from './Component/UserAddmovie';
import AcptMovie from './Layout/admin/movieAccept';
import DeleteMovie from './Layout/admin/deletemovie';
import Filter from './Component/filter';
import Search from './Component/search';
import Users from './Layout/admin/users';
const root = ReactDOM.createRoot(document.getElementById('root'));

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route>
         <Route index element={<Home />} />
          <Route path="/Movies" element={<Movies/>} />
          <Route path="/filter" element={<Filter/>} />
          <Route path="/AddMovie" element={<AddMovie/>} />
          <Route path="/AdminDash" element={<Admindash/>} />
          <Route path="/SignUp" element={<Signup/>} />
          <Route path="/AdminReview" element={<AdminReview/>}/>
          <Route path="/Login" element={<UserLogin/>} />
          <Route path="/search" element={<Search/>} />
          <Route path="/users" element={<Users/>} />
          <Route path="/watchlist" element={<Watchlist/>} />
          <Route path="/UserAddmovie" element={<UserMoive/>} />
          <Route path="/movieAccept" element={<AcptMovie/>} />
          <Route path="/deletemovie" element={<DeleteMovie/>} />
        </Route>
      </Routes>
    </BrowserRouter>
    <Footer/>
    </>
  
  );
}





root.render(
  
  <React.StrictMode>
    <AuthProvider>
        <App />
    </AuthProvider>
  </React.StrictMode>

);
