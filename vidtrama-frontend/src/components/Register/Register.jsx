import React, { useState } from 'react'


import registerStyle from './Register.css';

const Register = () => {
    let user = {};

    let [message, setMessage] = useState("Hello");
    let [boxVisible, setBoxVisible] = useState(false);

    function readValue(property, value) {
        user[property] = value; // for dynamic property we use [], we can't use . for dynamic values
        // console.log(user);
    }

    async function register() {
        console.log(user.password);
        const base_url = process.env.BACKEND_BASE_URL || 'http://localhost:5000';
        
        if(user.password === user.cpassword) {
            delete user.cpassword; // delte any property from object like this
            
            let options = {
                method: 'POST',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(user)
            }
            console.log(options.body);
            let responseData = await fetch(`${base_url}/register`, options)
            .catch((error) => {
                console.log(error);
            })
            let data = await responseData.json();
            setMessage(data.message);// set the success message in the message state variable.
            setBoxVisible(true); // make the box visible
            setTimeout(() => {
                setBoxVisible(false);
            }, 3000)      

            // fetch(`http://localhost:5000/register`, options)
            // .then((response) => response.json())
            // .then((data) => { 
            //     console.log("successfull");
                // setMessage(data.message);// set the success message in the message state variable.
                // setBoxVisible(true); // make the box visible
                // setTimeout(() => {
                //     setBoxVisible(false);
                // }, 3000)
            // })
            // .catch((error) => {
            //     console.log(error);
            // })

        } else {
            console.log("Password do not match");
        }
    }


    return (
        <div className="account-main">

            <div className="message-bg">
                {
                    boxVisible === true ? (
                        <div className="message">
                            {message}
                        </div>
                    ) : null
                }
            </div>

            <div className="account">
                <h1>Create an account</h1>
                <input type="text" placeholder="Enter Name" onChange={(event) => { readValue("name", event.target.value)} }/> {/* This will add the name property with the input value to the object we made above*/}
                <input type="text" placeholder="Enter Email" onChange={(event) => { readValue("email", event.target.value)} }/>
                <input type="text" placeholder="Enter username" onChange={(event) => { readValue("username", event.target.value)} }/>
                <input type="password" placeholder="Enter Password" onChange={(event) => { readValue("password", event.target.value)} }/>
                <input type="password" placeholder="Confirm Password" onChange={(event) => { readValue("cpassword", event.target.value)} }/>
                <button onClick={register}>Register</button>
            </div>
        </div>
    )
}

export default Register
