import logo from './logo1.jpg'
import { Outlet, Link, json } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Session from '../session/session';
import AuthContext from '../DataProvider';
import {useContext} from 'react'
import '../Component/mystyle.css'
function MyLinks() {
	const {userData,setUserData}=useContext(AuthContext)
	const nav = useNavigate();
	function logout() {
		Session.setrole(false);
		sessionStorage.setItem("key", null);
		console.log(sessionStorage.getItem('key'))
		nav('/');
	}

	const loginfo = window.localStorage.getItem('key');
	const result = JSON.stringify(loginfo)
	console.log(result)
	setUserData(loginfo)
	console.log(userData)


	
	var session = sessionStorage.getItem("key");
	//alert(Session.getrole()==0)
	console.log(userData)
	console.log(loginfo.search('key'))
	
	console.log(loginfo)
	console.log(Session.getrole)
	if (Session.getrole() == false && session == 'null' || session == null) {
		const check = Session.getrole()
		console.log(check)
		return (
			<>
				
				<li class="menu-item ">  <Link to="/"> Home</Link></li>
				<li class="menu-item"><Link to="/Login">Login</Link></li>
				<li class="menu-item"><Link to="/SignUp">Sign Up</Link></li>


			</>)
	}
	else if (loginfo == 0 && session != 'null') {
		return (
			<>
				
				<li class="menu-item ">  <Link to="/"> Home</Link></li>
				<li class="menu-item"><Link to="/Watchlist">Watch List</Link></li>
				<li class="menu-item"><Link to="/UserAddmovie">AddMovie</Link></li>
				<li class="menu-item"><Link to="/Search">Search</Link></li>
				<li class="menu-item">
					<input type="button"
						class="text-centre mybtn"
						name="submit"
						value="Logout"
						onClick={() => logout()} />

				</li>



			</>)
	}
	else if (loginfo == 1 && session != 'null') {
		return (
			<>
				<li class="menu-item ">  Welcome Admin</li>
				<li class="menu-item ">  <Link to="/"> Home</Link></li>
				<li class="menu-item"><Link to="/Admindash">Dashboard</Link></li>
				<li class="menu-item"><Link to="/Search">Search</Link></li>
				<li class="menu-item">
					<input type="button"
						class="text-centre mybtn"
						name="submit"
						value="Logout"
						onClick={() => logout()} />

				</li>



			</>)
	}
	else if (loginfo == 2 && session != 'null') {
		return (
			<>
				<li class="menu-item ">  Welcome Critic</li>
				<li class="menu-item ">  <Link to="/"> Home</Link></li>
				<li class="menu-item"><Link to="/Watchlist">Watch List</Link></li>
				<li class="menu-item"><Link to="/UserAddmovie">AddMovie</Link></li>
				<li class="menu-item"><Link to="/Search">Search</Link></li>
				<li class="menu-item">
					<input type="button"
						class="text-centre mybtn"
						name="submit"
						value="Logout"
						onClick={() => logout()} />

				</li>



			</>)
	}

}

function Header() {

	return (
		<>
			<div id="site-content" class='header'>
				<div class="site-header">
					<div class="container-fluid ">
						<a id="branding">
							<img src={logo} alt="" class="logo" />
							<div class="logo-copy " >
								<h1 class="site-title">Rating My Movie.com</h1 >
								<small class="site-description">Find the accurate review</small>
							</div>
						</a>
						<div class="main-navigation ">
							<button type="button" class="menu-toggle"><i class="fa fa-bars"></i></button>
							<ul class="menu">
								<MyLinks />
							</ul>

							<form class="search-form">
								
								<button><i class="fa fa-search" Link to ="/Search"></i></button>
							</form>

							<div class="mobile-navigation"></div>
						</div>
					</div>
				</div>
			</div>
			<Outlet />
		</>
	)


}


export default Header;