import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

export default function LandingPage() {
  return (
    <div className="MyImage">
      <img
        className="theImage"
        src="https://crehana-blog.imgix.net/media/filer_public/d5/d2/d5d26002-dadb-4203-b054-83e8e7fe7021/mejores-videojuegos-de-la-historia.gif"
        alt="img not found"
      />
      <Link to="/home">
        <button className="myButton">PRESS START</button>
      </Link>
    </div>
  );
}
