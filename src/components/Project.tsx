import React from "react";
import spotifyStats from '../assets/images/SPOTIFYSTATS.jpg'
import '../assets/styles/Project.scss';



function Project() {
    return(
    <div className="projects-container" id="projects">
        <h1>Personal Projects</h1>
        <div className="projects-grid">
            <div className="project">
                <a href="https://github.com/raimundo-vicuna/spotify-stats" target="_blank" rel="noreferrer"><img src={spotifyStats} className="zoom" alt="thumbnail" width="100%"/></a>
                <a href="https://github.com/raimundo-vicuna/spotify-stats" target="_blank" rel="noreferrer"><h2>Spotify Stats Web App</h2></a>
                <p>Developed a web app to find all your stats of spotify</p>
            </div>
        </div>
    </div>
    );
}

export default Project;