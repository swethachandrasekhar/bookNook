import React, { Component } from 'react';

import classes from './BackgroundVideo.module.css';

const BackgroundVideo = () => {
    const videoSource = "https://www.youtube.com/watch?v=kul-g_30HuU";

    return (
      <div className={classes.Container}>
        <video autoPlay="autoplay" loop="loop" muted className={classes.Video}>
          <source src={videoSource} type="video/mp4"/>
          Your Browser does not support
        </video>
      </div>
    );

}

export default BackgroundVideo;