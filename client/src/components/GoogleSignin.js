import React, { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';

const GoogleSignin = () => {
    const [user, setUser] = useState({});

    const handleCallbackResponse = (response) => {
        console.log("Encoded JWT ID token: " + response.credential);
        const userObject = jwt_decode(response.credential);
        console.log(userObject);
        setUser(userObject);
        document.getElementById("signin-button-google").hidden = true;
    }

    const onSignOut = (event) => {
        setUser({});
        document.getElementById("signin-button-google").hidden = false;
        google.accounts.id.disableAutoSelect();
    }

    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
            client_id: "963399771306-umvcgkgk6aaof9nhtn2dj8ap72rfvqnd.apps.googleusercontent.com",
            callback: handleCallbackResponse,
            context: "signin"
        });

        google.accounts.id.renderButton(
            document.getElementById("signin-button-google"),
            { theme: "outline", size: "large" }
        );

        google.accounts.id.prompt();
    }, []);

    return (
        <div className='signin-view'>
            <div id="signin-button-google"></div>
            {Object.keys(user).length !== 0 &&
                <button onClick={(e) => onSignOut(e)}>Sign Out</button>
            }

            {user &&
                <div>
                    <img src={user.picture} alt=''></img>
                    <h3>{user.name}</h3>
                </div>
            }
        </div>
    );
};

export default GoogleSignin;