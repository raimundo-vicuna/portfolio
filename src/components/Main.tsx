import React from "react";
import GitHubIcon from '@mui/icons-material/GitHub';
import '../assets/styles/Main.scss';

function Main() {

  return (
    <div className="container">
      <div className="about-section">
        <div className="content">
          <div className="social_icons">
            <a href="https://github.com/raimundo-vicuna" target="_blank" rel="noreferrer"><GitHubIcon/></a>
          </div>
          <h1>Raimundo Vicuña</h1>
          <p>Backend Developer</p>

          <div className="mobile_social_icons">
            <a href="https://github.com/raimundo-vicuna" target="_blank" rel="noreferrer"><GitHubIcon/></a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;