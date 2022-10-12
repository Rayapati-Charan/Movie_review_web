import Header from '../../Component/header'
import footer from '../../Component/footer'
import '../../Component/mystyle.css'
import Axios from 'axios';
// function Movie() {
//     return (
//         <>
//             <div class="card mymovie-box">
//                 <img  src="https://upload.wikimedia.org/wikipedia/en/thumb/e/e1/Spider-Man_PS4_cover.jpg/220px-Spider-Man_PS4_cover.jpg" class="card-img-top " alt="..."/>
//                     <div class="card-body">
//                         <h5 class="card-title">Movie</h5>
//                         <p class="card-text">Castings , year</p>
//                         <a href="#" class="btn btn-primary">Give a Review</a>
//                     </div>
//             </div>
//         </>
//     );

// }
// export default Movie;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


function del(props){
    const nav=useNavigate;
    Axios.post("http://localhost:3001/moviedelete",{
                            movie_id:props.sl,
                            movie_name:props.name,
                         }).then((response)=>{
                            if(response.data.message==='success'){
                                console.log("Updated")
                            }
                         })
                         console.log('shift')
                         window.location.reload()
}

function add(props){
    const nav=useNavigate;
    Axios.post("http://localhost:3001/movie",{
                title: props.name,
                genre: props.genre,
                language: props.language,
                year:props.year,
                url:props.url,
                 }).then((response)=>
                 {
                    console.log(response)
                    console.log(response.data.message)
                     if (response.data.message == "success") 
                     {
                         console.log('Added Success');

                     }
                     else {
                         console.log("Something Went Wrong");
         
                     }
                 }).catch((error)=>{console.log(error);})
                 del(props)
                 console.log("One Added Movie");
                 window.location.reload()
        }
function AcptMovie() {

   const [data, setData] = useState([]);
   var getData = () => {

       fetch('http://localhost:3001/adminmovies'

           , {
               headers: {
                   'Content-Type': 'application/json',
                   'Accept': 'application/json'
               }

           }

       )

           .then(function (response) {

               console.log(response)
               return response.json();

           })

           .then(function (myJson) {

               console.log(myJson);

               setData(myJson)

           });

   }

   useEffect(() => {

       getData()

   }, [])
   function sum(pass){
    pass= pass+pass;
        return pass;
    }
   //   
   {/*  */}
   return (
    <>
    <Header />
            <div class="main-content ">
                <div class="page">
                    <div class="container">
                            {data && data.length > 0 && data.map((item) =>
                            <div class="card" style={{width:'13rem',marginTop:'10%'}}>
                                <img src={item.url} class="card-img-top img-height " alt="..."/>
                                <div class="card-body">
                                  <h5 class="card-title">Movie Name :{item.name}</h5>
                                  <h5 class="card-title">Release Year: {item.year}</h5>
                                  <h5 class="card-title">Language: {item.language}</h5>
                                  <button class="btn btn-primary" style={{marginleft:'5%'}} id='add' onClick={()=>add(item)}>Add</button>
                                  <button class="btn btn-danger" id='del' onClick={()=>del(item)}>Delete</button>
                                </div>
                              </div>
                            )}
                           
                    </div>
                </div>
            </div>
       </>
   );

}


export default AcptMovie;