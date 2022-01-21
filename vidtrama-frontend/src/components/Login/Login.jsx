import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'

const Login = () => {
    // let navigate = useNavigate(); // To redirect to different pages.

    let user = {};

    let [ message, setMessage ] = useState('Hello');
    let [ boxVisible, setBoxVisible ] = useState(false);


    function readUser(property, value) {
        user[property] = value;
    }
  
    function Login(property, value) {
        console.log('called');
        const base_url = process.env.BACKEND_BASE_URL || 'http://localhost:5000';
        const options = {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(user)
        }

        fetch(`${base_url}/login`, options)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            if(data.success === true) {
                console.log("login");
                // localStorage.setItem('vs_details', JSON.stringify(data)); // Storing the entire data you can receiving 
                localStorage.setItem('vs_details', JSON.stringify({token: data.token, user_id: data.user_id})); // Storing the entire data you can receiving as strring while using you will have t parse it. vs_detils is the name
                // navigate("/videos");
            } else {
                console.log("prob login");
                setMessage(data.message);
                setBoxVisible(true);

                setTimeout(() => { 
                    setBoxVisible(false);
                }, 3000);
            }
        })
    }

    return(
        <div className="account-main">
            <div className="account">
                <h1>Sign In</h1>
                <input type="text" placeholder="Enter your username" onChange={(event)=>{readUser("username", event.target.value)}}/>
                <input type="text" placeholder="Enter your password" onChange={(event)=>{readUser("password", event.target.value)}}/>
                <button onClick={Login}>Sign in</button>
            </div>
        </div>
    )
}

export default Login;

// You cannot call a hook in callback function. React Hook must be called inside a 
