import Header from '../../Component/header'
import footer from '../../Component/footer'
import { useNavigate } from 'react-router-dom';
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

const nav = useNavigate;

function del(props){
    Axios.post("http://localhost:3001/admindelete",{
                            movie_id:props.sl,
                            movie_name:props.name,
                         }).then((response)=>{
                            if(response.data.message==='success'){
                                console.log("Admin Deleted Movie");
                                
                            }
                         })
}

function DeleteMovie() {

   const [data, setData] = useState([]);
   var c=0;
   var getData = () => {

       fetch('http://localhost:3001/mymovies'

           , {
               headers: {
                   'Content-Type': 'application/json',
                   'Accept': 'application/json'
               }

           }

       )

           .then(function (response) {

               console.log(response)
               console.log(c)
               c++;
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
            <div class="main-content">
                <div class="dash">
                        <div class='row card-ti1  tl'>
                            {data && data.length > 0 && data.map((item) =>
                            <div class="card del-card" style={{width:'13rem',marginTop:'10%'}}>
                                <img src={item.url} class="card-img-top img-height " alt="..."/>
                                <div class="card-body">
                                  <h5 class="card-title">Movie Name :{item.name}</h5>
                                  <h5 class="card-title">Release Year: {item.year}</h5>
                                  <h5 class="card-title">Language: {item.language}</h5>
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


export default DeleteMovie;