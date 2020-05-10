import React from "react";
import "./Home.css";
import backgroundImage from "./clients-background.jpg";
const Home = () => {
  const divStyle = {
    position: "absolut",
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    width: "100vw",
    backgroundImage: `url(${backgroundImage})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

  const container = {
    // position: "relative",
    // top: "10vh",
    // left: "28vw",
    width: "45%",
    height: "50%",
    backgroundColor: "#f8f8fadb",
    borderRadius: 10,
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.9), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
  };

  const paragraphStyle = {
    paddingLeft: "2vw",
    paddingRight: "2vw",
    lineHeight: "4vh",
    textAlign: "left",
  };

  return (
    <div style={divStyle}>
      <div style={container}>
        <h1>Welcome To My CRM</h1>
        <div style={paragraphStyle}>
          <p style={{ fontSize: "2vw" }}>
            This is a CRM demo project made by Dor Ben Lulu. Hope you will enjoy
            it!
          </p>
          <ol style={{ fontSize: "2vw" }}>
            <li>
              To view the client's list, press <b>'Clients'</b>.
            </li>
            <li>
              To perform differnt action and updates on clients, press{" "}
              <b>'Actions'</b>.
            </li>
            <li>
              To view different analytics data about sellers and clients, press{" "}
              <b>'Analytics'</b>.
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default Home;
