
import Header from '../Component/header'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import '../Component/mystyle.css'
import { useNavigate } from "react-router-dom";
export default function Admindash(){
    const nav = useNavigate();

    function accept(){
        nav("/movieAccept")
    }

    function review(){
        nav("/AdminReview")
    }

    function del(){
        nav("/DeleteMovie")
    }

    function user(){
        nav("/Users")
    }

    function add(){
        nav("/AddMovie")
    }
  
    return (
       <>
        <Header/>
        <div class='dash row'>
        <h1>Dashboard</h1>
            <div class='dash-card col'>
                <Card style={{ width:'18rem'}}>
                    <Card.Body >
                        <h2>Add Movie</h2>
                        <Card.Subtitle className="mb-2 text-muted">Add movie to Watchlist</Card.Subtitle>
                        <Button variant="outline-primary" onClick={()=>add()}>Add Movie</Button>{' '}
                    </Card.Body>
                </Card>
            </div>
            <div class='dash-card col'>
                <Card style={{ width:'18rem', height:'150px'}}>
                    <Card.Body >
                        <h2>Delete Movie</h2>
                        <Card.Subtitle className="mb-2 text-muted">You Can Delete the movie</Card.Subtitle>
                        <Button variant="outline-primary" onClick={()=>del()}>Delete</Button>{' '}
                    </Card.Body>
                </Card>
            </div>
            <div class='dash-card col'>
                <Card style={{ width:'18rem', height:'150px'}}>
                    <Card.Body >
                        <h2>Reviews</h2>
                        <Card.Subtitle className="mb-2 text-muted">View all the reviews here</Card.Subtitle>
                        <Button variant="outline-primary" onClick={()=>review()}>View</Button>{' '}
                    </Card.Body>
                </Card>
            </div>
            <div class='dash-card col'>
                <Card style={{ width:'18rem', height:'150px'}}>
                    <Card.Body >
                        <h2>Users</h2>
                        <Card.Subtitle className="mb-2 text-muted">View all the users, Critics and Admins</Card.Subtitle>
                        <Button variant="outline-primary" onClick={()=>user()}>View</Button>{' '}
                    </Card.Body>
                </Card>
            </div>
            <div class='dash-card col'>
                <Card style={{ width:'18rem', height:'150px'}}>
                    <Card.Body >
                        <h2>Accept Movie</h2>
                        <Card.Subtitle className="mb-2 text-muted">Accept the movies Added by Users/Critics</Card.Subtitle>
                        <Button variant="outline-primary" onClick={()=>accept()}>View</Button>{' '}
                    </Card.Body>
                </Card>
            </div>
        </div>
        </>
    )

}