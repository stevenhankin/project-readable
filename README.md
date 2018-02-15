# Readable API Server

This is an implementation of Udacity's content and comment web app for the Redux course. 
Users can post content to predefined categories, comment on their posts and other users' posts, 
and vote on posts and comments. Users can also edit and delete posts and comments.

The project includes a backend API Server that interacts with the front-end portion of the project.

## Getting started

These instructions will get you a copy of the project up and running on your local machine 
for development and testing purposes. See deployment for notes on how to deploy the project 
on a live system.

### Prerequisites
* [Node v6+](https://nodejs.org/en/) - Server and build engine

### Installing and starting
In a command window:
```
cd api-server
npm install
npm start
```
In a second command window:
```
cd frontend
npm install
npm start
```
A browser window should now open with the application running, or open [in a browser window directly](http://localhost:3000/)

## Built with
* [React](https://reactjs.org/) - The web framework used
* [Redux](https://redux.js.org/) - State Management
* [Router](https://reacttraining.com/react-router/) - Declarative client-side routing
* [React-Bootstrap](https://react-bootstrap.github.io/) - Front-end presentation framework
* [create-react-app](https://www.npmjs.com/package/create-react-app) - React project bootstrapper
 

## Source Layout
I've based the project structure on a [Feature Layout](https://medium.com/@alexmngn/how-to-better-organize-your-react-applications-2fd3ea1920f1)
```
/src
  /scenes
    /components     <-- React components common across scenes
    <Scenes>        <-- Hierarchy of scenes and related components
  /services/api.js  <-- Module for XHR interaction with api-server
  /store            <-- Contains Action/Reducer modules for each component that uses Redux
  index.js          <-- Application root
  store.js          <-- Redux store and reducer bootstrap
```


## License
This project is licensed under the MIT License - see the LICENSE.md file for details
