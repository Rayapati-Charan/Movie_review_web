
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const Axios = require("axios")
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const app = express();
const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "Kukku@236",
    database: "movie_app",

});

app.use(express.json());
app.use(
    cors({
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true

    })
);
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

function message(props) {
    console.log(props);
}


app.get('/login', (req, res) => {
    res.send('This has CORS enabled ')
})
app.get('/movie', (req, res) => {
    res.send('This has CORS enabled ')
})

//admin login
app.post('/login', (req, res) => {
    const username = req.body.email;
    const password = req.body.password;
    db.execute(
        "SELECT * FROM admin WHERE email = ? AND password = ?",
        [username, password],
        (err, result) => {
            if (err) {
                console.log(err);
            }
            if (result.length > 0) {
    
                res.send({ message: "success" });
            }
            if (result.length <= 0) {
                res.send({ message: "error" })
            }

        }

    );
});
//register

app.post('/signup', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    db.query("SELECT * FROM users Where email = ?", 
    [email],
    (err, results, fields) => {
        if(results.length > 0)
        {   console.log(err);
            res.send({ message:"User Exists"})
        }else{
            db.execute(
        
                "INSERT INTO users (name,email,password) values(?,?,?) ",
                [name,email,password],
                (err, result)=> {
                  // console.log(result);
                    if (err) {
                      console.log(err);
                    }
                    else{
                            res.send({message: "success"});
                    }
                    }
                
            );
        }
      });
    
   });

//user Login
app.post('/userlogin', (req, res) => {
    const username = req.body.email;
    const password = req.body.password;
    db.execute(
        "SELECT * FROM users WHERE email = ? AND password = ?",
        [username, password],
        (err, result) => {
            if (err) {
                console.log(err);
            }
            if (result.length > 0) {
                console.log("Success");
                if(result[0].role==0)
                {
                    res.send({ message: "success",role:0 });
                }
                else if(result[0].role==1){
                    res.send({ message: "success",role:1 });
                }
                else if(result[0].role==2){
                    res.send({ message: "success",role:2 });
                }
               
            }
            if (result.length <= 0) {
                res.send({ message: "error" })
            }

        }

    );
});
//movie

app.post('/movie', (req, res) => {
    const moviename  = req.body.title;
    const year = req.body.year;
    const language = req.body.language;
    const genre = req.body.genre;
    const rating =0;
    const url = req.body.url;
    db.execute(
        "INSERT INTO movie (name,year,genre,language,rating,url) values(?,?,?,?,?,?) ",
        [moviename,year,genre,language,rating,url],
        (err, result)=> {
          // console.log(result);
            if (err) {
               console.log(err); 
            }
            if (result.length > 0) {
                res.send({message: "success"});
                }
           if(result.length <= 0)
           {
            res.send({ message: "error" })
           }
          
            }
        
    );
   });
//submit rating 
//

app.post('/usermovie', (req, res) => {
    const moviename  = req.body.title;
    const year = req.body.year;
    const language = req.body.language;
    const genre = req.body.genre;
    const rating =0;
    const url = req.body.url;
    db.execute("select * from usermovies where name=? and url=?",[moviename,url],(err,result)=>{
        if(err) throw err;
        if(result.length > 0){
            res.send({message:'Movie Already Exists'})
        }
        else{
            db.execute(
                "INSERT INTO usermovies (name,year,genre,language,rating,url) values(?,?,?,?,?,?) ",
                [moviename,year,genre,language,rating,url],
                (err, result)=> {
                  // console.log(result);
                    if (err) {
                       console.log(err); 
                    }
                    if (result.length > 0) {
                        res.send({message: "success"});
                        }
                   if(result.length <= 0)
                   {
                    res.send({ message: "error" })
                   }
                  
                    }
                
            );
        }
    
    })
    
   });

app.post('/changerev',(req,res)=>{
    const movieid  = req.body.movie_id;
    const rating =req.body.rating;
    const userid = req.body.user_id;
    const userrole = req.body.user_role;
    const value = req.body.value;

    db.query("select * from review where user_id=? and movie_id=?",[userid,movieid],(err,result)=>{
        if(err) throw err;
        console.log('Done');
        if(result.length <1){
            res.send({message:'No review availabe'})
        }
        else{
            db.execute("update review set value=?, rating=? where user_id=? and movie_id=? ",
                [value,rating,userid,movieid],
                (err, result)=> {
                    if(err) throw err;
                    if (result.length > 0) {
                        res.send({message: "success"});
                        }
                   if(result.length <= 0)
                   {
                    res.send({ message: "error" })
                   }
                  
                    }
                
            );
        }
    })
})



app.post('/rating', (req, res) => {

    const movieid  = req.body.movie_id;
    const rating =req.body.rating;
    const userid = req.body.user_id;
    const userrole = req.body.user_role;
    const value = req.body.value;

    db.query("SELECT value FROM review WHERE user_id = ? AND movie_id =?",[userid,movieid], (err, results, fields) => {
        if(err) throw err;
        if(results.length > 0)
        { 
            str=''
            results.map((data)=>str+=data.value)
            res.send({ message:str})
        }
        else{
            //query to update user to critic 
            db.query("SELECT * FROM review WHERE user_id = ?",[userid], (err, results, fields2) => {
                if(err) throw err;
                if(results.length > 1)
                {   
                    if(userid==1)
                    { 
                        //skip
                    }else{
                    console.log("Critic Updated")
                    db.query("UPDATE users SET role = ? WHERE email = ?",[2,userid], (err, results, fields2) => {
                        if(err) throw err;
                        if(results.length > 0)
                          { 
                            console.log('critic logged')
                          }else{
                            console.log(results)
                          }
                        
                    });
                }
                }
            });
            //insert review
            db.execute(
                "INSERT INTO review (movie_id,user_id,user_role,rating,value) values(?,?,?,?,?) ",
                [movieid,userid,userrole,rating,value],
                (err, result)=> {
                    if (result.length > 0) {
                        res.send({message: "success"});
                        }
                   if(result.length <= 0)
                   {
                    res.send({ message: "error" })
                   }
                  
                    }
                
            );}
      });
   
   });
//movie details 
app.get('/mymovies', (req, res) => {
    db.query("SELECT * FROM movie", (err, results, fields) => {
      if(err) throw err;
         res.send(results);
    });
});
//rating details 


app.get('/adminmovies', (req, res) => {
    db.query("SELECT * FROM usermovies", (err, results, fields) => {
      if(err) throw err;
         res.send(results);
    });
});


//get movie id
var mid = 0;
app.get('/Myrating', (req, res) => {
   // console.log(mid);
    db.query("SELECT * FROM review", (err, results, fields) => {
      if(err) throw err;
         res.send(results);
    });
});

app.get('/search', (req, res) => {
    const ele=req.body.ele;
    db.query("SELECT * FROM movie where name=?",[ele], (err, results, fields) => {
      if(err) throw err;
         res.send(results);
    });
});

app.post('/delete', (req, res) => {
    console.log("Come");
    const movieid  = req.body.movie_id;
    const userid  = req.body.user_id;
    db.query("delete from review where movie_id=? and user_id=?",[movieid,userid], (err, results) => {
      if(err) throw err;
      res.send({message:'success'})
    });
    db.query("SELECT * FROM review WHERE user_id = ?",[userid], (err, results, fields2) => {
        if(err) throw err;
        if(results.length <= 3)
        {   
            if(userid==1)
            { 
                //skip
            }else{
            console.log("Changed To user")
            db.query("UPDATE users SET role = ? WHERE email = ? and role != 1",[0,userid], (err, results, fields2) => {
                if(err) throw err;
                if(results.length > 0)
                  { 
                    console.log('User logged')
                  }else{
                    console.log(results)
                  }
                
            });
        }
        }
    });
});

app.post('/moviedelete', (req,response, fields) => {
    console.log("Come");
    const id  = req.body.movie_id;
    const name  = req.body.movie_name;
    db.query("delete from usermovies where name=? and sl=?",[name,id], (err, results) => {
      if(err) throw err;
      response.send({message:'success'})
    });
});

app.post('/admindelete', (req, res) => {
    
    const id  = req.body.movie_id;
    const name  = req.body.movie_name;
    db.query("delete from movie where name=? and sl=?",[name,id], (err, results) => {
      if(err) throw err;
      res.send({message:'success'})
    });
});

app.get('/users', (req, res) => {
    db.query("SELECT * FROM users", (err, results, fields) => {
      if(err) throw err;
         res.send(results);
    });
});

app.listen(3001, () => {
    console.log("running server");
});


