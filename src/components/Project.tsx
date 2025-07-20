import React from "react";
import spotifyStats from '../assets/images/SPOTIFYSTATS.jpg';
import sudoku from '../assets/images/sudoku.jpg';
import zvonkis from '../assets/images/zvonkis.jpg'
import '../assets/styles/Project.scss';



function Project() {
    return (
        <div className="projects-container" id="projects">
            <h1>Personal Projects</h1>
            <div className="projects-grid">
                <div className="project">
                    <a href="https://github.com/raimundo-vicuna/spotify-stats" target="_blank" rel="noreferrer"><img src={spotifyStats} className="zoom" alt="thumbnail" width="100%" /></a>
                    <a href="https://github.com/raimundo-vicuna/spotify-stats" target="_blank" rel="noreferrer"><h2>Spotify Stats Web App</h2></a>
                    <p>Developed a web app to find all your stats of spotify</p>
                </div>

                <div className="projects-grid">
                    <div className="project">
                        <a href="https://github.com/raimundo-vicuna/spotify-stats" target="_blank" rel="noreferrer"><img src={sudoku} className="zoom" alt="thumbnail" width="100%" /></a>
                        <a href="https://github.com/raimundo-vicuna/spotify-stats" target="_blank" rel="noreferrer"><h2>Sudoku Solver</h2></a>
                        <p>Developed a Sudoku Solver with Backtracking</p>
                    </div>
                </div>

                <div className="projects-grid">
                    <div className="project">
                        <a href="https://github.com/raimundo-vicuna/zvonkis" target="_blank" rel="noreferrer"><img src={zvonkis} className="zoom" alt="thumbnail" width="100%" /></a>
                        <a href="https://github.com/raimundo-vicuna/zvonkis" target="_blank" rel="noreferrer"><h2>Google Extension</h2></a>
                        <p>Developed a Google extension to show your data in real time on your tab</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Project;