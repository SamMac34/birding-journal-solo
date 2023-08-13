import React from 'react';
import './AboutPage.css'

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <div className="about-page-body">
      <div className="about-description-container">
        
        <p className="about-description">
          The Aviary was created to provide bird watchers everywhere with an easy to use 
          tool for keeping track of the birds they've seen and even birds they would
          like to see someday. Members can upload photos and take detailed notes about 
          their observations and keep track of the date, time, and where they were, all in
          one easy place. Using the Nuthatch API, Aviary members can search through
          a massive database of over 1000 images of birds to aid in identification or to
          just enjoy the beautiful photos of our feathered friends. I hope you enjoy the 
          app and happy birding!
        </p>


      </div>
    </div>
  );
}

export default AboutPage;
