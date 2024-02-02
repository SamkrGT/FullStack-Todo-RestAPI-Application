import './TodoApp.css'
import {useParams, Link} from "react-router-dom";
import { useState } from 'react';
import {retriveHelloWorldPathVariable } from './api/HelloWorldApiService';
import { useAuth } from './security/AuthContext';

function WelcomeComponent(){
    
    const {username} =useParams()

    const authContext = useAuth()

    const [message, setMessage] = useState(null)

    function callRestApi(){

        // retriveHelloWorldBean()
        //     .then( (response) => successfulResponse(response) )
        //     .catch( (error) => errorResponse(error) )
        //     .finally ( () => console.log('cleanup'))

        retriveHelloWorldPathVariable('Sam', authContext.token)
        .then( (response) => successfulResponse(response) )
        .catch( (error) => errorResponse(error) )
        .finally ( () => console.log('cleanup'))
    }

    function successfulResponse(response){
        console.log(response)
        setMessage(response.data.message)
    }

    function errorResponse(error){
        console.log(error)
    }

    return (
        <div className="welcome">
            <h1>Welcome {username} to my website</h1>
            <div>
                Manage your todos - <Link to="/todos">Go Here</Link>
                <button type="button" className="btn btn-primary" onClick={callRestApi}>Call Rest API</button>
            </div>
            <div className='text-info'>{message}</div>
        </div>
    )
}

export default WelcomeComponent;