import React from "react";
import { Link } from "react-router-dom";

//Link does not post back to the server, handling the routing on the client
const HomePage = () => (
  <div className="jumbotron m-3">
    <h1>Pluralsight Administration</h1>
    <p>React, Redux and React Router for ultra-responsive web apps.</p>

    <Link to="about" className="btn btn-primary btn-lg">
      Learn more
    </Link>
  </div>
);

export default HomePage;
