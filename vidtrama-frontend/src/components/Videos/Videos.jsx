import React, {useEffect, useState, useRef } from 'react';

const Videos = () => {

  let [videos, setVideos] = useState([]); // what ever video we will be getting we will be setting it in the video state variable so
  
  // let token = JSON.parse(localStorage.getItem('vs_details')).token;// Get the token from the object stored in localStorage and since it is stored in dtring format we need to parse it.
  let token = useRef(JSON.parse(localStorage.getItem('vs_details')).token); // if you try to use token value after re-render
  // useRef is used to persist values throughout renders. (like global variable will persiste the value even if the function gets fully executed)
  // useRef: If you chnage the value of useRef.current nothing will happen, the component will not re-render, 
  // for theme chnage white and dark use useState() sice it will renrender the component to apply the theme.
  
useEffect(() => {
    const backend_url = process.env.BACKEND_BASE_URL || '';
    const options = {
      header: {
        "Content-type": 'application/json',
        "Authorization": `Bearer ${token}`
      }
    }

    fetch(`${backend_url}/videos`, options)
    .then((response) =>response.json())
    .then((data) => { 
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    })
  }, []) // call the useEffect only once when mounting else it will call the fetch api continuously till the video is being loaded/played

  return (
    <div className="bg">
      <h1>All Videos</h1>
        <div className="video-container">
          {
            videos.map((video, index) => {
              return (
                  <div className="video-card" key={index}>
\                      <div className="video-image">
                        <img src={video.posterurl} alt={video.originalTitle} className="video-img"/>
                      </div>
                      <div className="padd"> 
                          <h1>Some </h1>
                          <p>
                            Action . Thriller 
                          </p>
                          <p>
                            IMDB
                          </p>
                          <button className="btn">Watch  Movie</button>
                      </div>
                    </div>
              )
            })
          }
          
        </div>
    </div>
  );
};

export default Videos;
