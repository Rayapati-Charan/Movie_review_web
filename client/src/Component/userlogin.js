import Header from './header'
import './mystyle.css'
import { useState, useEffect } from 'react'
import Axios from 'axios';
import { useNavigate } from "react-router-dom";
import Session from '../session/session';
import { useContext } from 'react';
import AuthContext from '../DataProvider';

Axios.defaults.withCredentials = true;

export default function Userlogin() {
  const nav = useNavigate();
  var {logdetails,setlogdetails}=useContext(AuthContext)

  const [email, setrole] = useState("");
  const [password, setpassword] = useState("");
  const [status, setstatus] = useState("");
  var loginfo = 0


  const login = () => {

    if (email != "" && password != "") {
      Axios.post("http://localhost:3001/userlogin", {
        email: email,
        password: password,
      }).then((response) => {
        if (response.data.message === "success") {
          sessionStorage.setItem("key", email);
          console.log(response.data.role)
          if(response.data.role == 0)
          {
            Session.setrole(0);
            loginfo = 0
            nav("/");
          }
          else if(response.data.role == 1)
          {
            Session.setrole(1)
            setlogdetails(JSON.stringify(1));
            loginfo = 1
            nav("/Admindash");
          }
          else{
            Session.setrole(2);
            setlogdetails(JSON.stringify(2));
            loginfo = 2
            nav("/");
          }
          
          console.log(logdetails=='1')
          console.log(window.localStorage.getItem('key')!=null)
          if(window.localStorage.getItem('key')!=null){
            window.localStorage.removeItem('key')
          }
          console.log(logdetails)
          console.log(window.localStorage.getItem('key')!=null)
          window.localStorage.setItem('key',loginfo)
          console.log(window.localStorage.getItem('key'))
          
        }
        else {
          setstatus("Wrong Email or Password");

        }
      });
    }
    else {
      setstatus("Please enter all the feilds");
    }
  };
  return (

    <>
      <Header />

      <div class="main-content">
        <div class="container">
          <div class="page">
            <div class="row justify-content-lg-center">

              <div class="col-lg-auto myloginbox">
                <h1 class="text-centre">Login</h1>

                <div class="contact-form text-center">
                  <input type="email"
                    class="email"
                    name="email"
                    placeholder="Email"
                    onChange={(e) => setrole(e.target.value)}
                    required />
                  <input type="password"
                    class="password"
                    name="password"
                    placeholder="Password"
                    onChange={(e) => setpassword(e.target.value)}
                    required />
                  <div class="alert-danger" >  {status} </div>
                  <input type="button" class="text-centre" name="submit" value="Login " onClick={() => login()} />

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
