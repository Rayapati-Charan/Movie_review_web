
import React, { useState, useEffect } from 'react';
import Header from '../Component/header'
import Carousel from 'react-bootstrap/Carousel'
import { useContext } from 'react';
import AuthContext from '../DataProvider';
import '../Component/mystyle.css'
import { useNavigate } from "react-router-dom";
export default function Home() {
    const {userData,setUserData}=useContext(AuthContext)



    const nav = useNavigate();
    const [data, setData] = useState([]);
    const review = (id, name, url, rating, year, language, genre,review) => {
        nav('/Movies', {
            state: {
                id: id, name: name,
                url: url,
                rating: rating,
                year: year,
                language: language,
                genre: genre,
                review:review
            }
        })
    }
    const getData = () => {
        fetch('http://localhost:3001/mymovies'
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
                const movieNames=[]
                myJson.map((movie) =>movieNames.push(movie.name))
                console.log(movieNames)
                setUserData({movieNames})
                console.log(userData)
                
            });
    }
    useEffect(() => {
        getData()
    }, [])
//
 function sum(pass){
    pass= pass+pass;
        return pass;
    }
   
   
    return (
        <>

            <Header />

            <div class="bgim">
            <div class="">
                <div class="">
                    <div class="container-fluid" >
                        <div class="row card-ti1  tl">
                            {data && data.length > 0 && data.map((item) =>
                                <div class="card" style={{width: "18rem",height:'650px',marginLeft:'2%',marginRight:'2%',marginTop:'10%',backgroundColor:'white'}}>
                                <img width='150px'height='350px' src={item.url} class="card-img-top" alt="..."/>
                                <span class="badge"  style={{fontSize:'5'}}>{item.genre}
                                            </span>
                                <div class="card-body">
                                  <h3 class="card-title">Movie Name :{item.name}</h3>
                                </div>
                                <ul class="list-group list-group-flush">
                                  <li class="list-group-item">Release Date: {item.year}</li>
                                  <li class="list-group-item">Language: {item.language}</li>
                                  <li class="list-group-item">Genre: {item.genre}</li>
                                </ul>
                                <div class="card-body">
                                  <button type="button" id='review' class="btn btn-light"
                                  onClick={() => review(item.sl,
                                    item.name,
                                    item.url,
                                    item.rating,
                                    item.year,
                                    item.language,
                                    item.genre)}>Give Review</button>
                                </div>
                              </div>
                            )}
                           
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">

            </div>
            </div>
        </>

    )

}