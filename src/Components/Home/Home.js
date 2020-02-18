import React from 'react';
import './Home.css'
import backgroundImage from './clients-background.jpg'
const Home = () => {
    const divStyle = {
        position: "relative",
        overflow: "hidden",
        height: "100vh",
        width: "100vw",
        backgroundImage: `url(${backgroundImage})`, 
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat"
    }
    return (
        <div style={divStyle}>
        
        </div>
    );
};

export default Home;