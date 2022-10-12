
import Header from '../../Component/header'
import { useLocation } from 'react-router-dom';
import React from 'react'
import { Outlet, Link } from "react-router-dom";
import Session from '../../session/session';
import { useState, useEffect } from 'react'
import Axios from 'axios';
import Rating from '../../Component/Rating'
import '../../Component/mystyle.css'

//movies
export default function Users() {
    const [data, setData] = useState([]);
    const [userdata,setuserdata] = useState([]);
    const [criticdata, setcriticdata] = useState([]);
    const [admindata, setadmindata] = useState([]);
    const location = useLocation();
    const getData = () => {
    
      fetch('http://localhost:3001/users'
          , {
              headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
              }
          })
          .then(function (response) {
              console.log(response)
              return response.json();
          })
          .then(function (myJson) {
              console.log(myJson);
              setData(myJson)
              var update=[]
              myJson.map((val)=>{if(val.role==0){update.push(val)}})
              setuserdata(update)
              console.log(userdata)
              update=[]
              myJson.map((val)=>{if(val.role==2){update.push(val)}})
              setcriticdata(update)
              console.log(criticdata)
              update=[]
              myJson.map((val)=>{if(val.role==1){update.push(val)}})
              setadmindata(update)
              console.log(admindata)
          });
  }
  useEffect(() => {
      getData()
  }, [])

//code to get the review details 
  return (
    <>
      <Header />

      <div class="main-content">
      <div class="page">
          <div class="container">
           
            <div class="content">
            <div class="row">  
              <h2>Users</h2>
              <hr></hr>
               { userdata.map((item) =>
                <div class="col-lg-3">
                <div class="row">
                     <div class=" review-box ">
                      
                     
                             <h4>{item.name}</h4>
                        <div class="col-lg-3">
                            <img class="test-img"src="https://www.nicepng.com/png/detail/128-1280406_view-user-icon-png-user-circle-icon-png.png" />
                        </div>
                        <div class="col-lg-9">
                            <span>{item.email}</ span> 
                            
                       </div>
                      </div>  
                    </div>           
                </div>
               )}

              </div>
              <br></br>
              <br></br>
              <div class="row">  
              <h2>Critic</h2>
              <hr></hr>
               { criticdata.map((item) => 
                <div class="col-lg-3">
                <div class="row">
                     <div class=" review-box ">
                      
                     
                             <h4>{item.name}</h4>
                        <div class="col-lg-3">
                            <img class="test-img"src="https://www.nicepng.com/png/detail/128-1280406_view-user-icon-png-user-circle-icon-png.png" />
                        </div>
                        <div class="col-lg-9">
                            <span>{item.email}</ span> 
                       </div>
                      </div>  
                    </div>           
                </div>
               )}
               <br></br>
              <br></br>

              </div>
              <br></br>
              <br></br>
              <div class="row">  
              <h2>Admins</h2>
              <hr></hr>
               { admindata.map((item) =>
                <div class="col-lg-3">
                <div class="row">
                     <div class=" review-box ">
                      
                     
                             <h4>{item.name}</h4>
                        <div class="col-lg-3">
                            <img class="test-img"src="https://www.nicepng.com/png/detail/128-1280406_view-user-icon-png-user-circle-icon-png.png" />
                        </div>
                        <div class="col-lg-9">
                            <span>{item.email}</ span> 
                       </div>
                      </div>  
                    </div>           
                </div>
               )}

              </div>
            </div>
          </div>
        </div>
        </div>
    
    </>

  )

}