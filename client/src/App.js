import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from './components/Signin';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Signin />} />
                <Route path="/signin" element={<Signin />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;