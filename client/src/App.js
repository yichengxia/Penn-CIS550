import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FacebookSignin from './components/FacebookSignin';
import GoogleSignin from './components/GoogleSignin';
import Signin from './components/Signin';
import Signup from './components/Signup';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<FacebookSignin />} />
                {/* <Route path="/" element={<GoogleSignin />} /> */}
                <Route path="/signin" element={<Signin />} />
                <Route path="/signup" element={<Signup />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;