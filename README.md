# Getting Started with Create React App

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.


### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!



Tech Stack
React 


### `Implementation Highlights`

single page application web client with React
service oriented architecure backend
REST for client server communication, JSON RPC for inter service communication
scrape raw movie data from imdb
provides processed imdb movies data with our movie service API
persisted ElasticSearch for movie's database for optimized searching capability
PostgreSQL for user's database

User Stories
users can register and log in to their account
landing page has collections of movie for recommendations
users can search for movies
users can browse search result by pages
users can select and view details of a movie
users can see his/her history of browsed movie
users can add or remove movie to his/her bookmark


Future Plans for Expansion

seperate search into its own service that utilize ElasticSearch, use MongoDB as persisted database for movie-service and sync data between ElasticSearch and MongoDB
Machine Learning recommendation system?
Machine Learning classification for recommended movie collections?
scrape and stream videos for movies?