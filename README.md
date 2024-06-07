# Bruin Bites

<div style="text-align: center;">
    <img src="client/public/bruinbiteslogo.jpg" alt="Bruin Bites Logo" width="200px">
</div>

## Table of Contents
- [Features](https://github.com/andxsu/CS_35L_24S/#features)
- [Technologies](https://github.com/andxsu/CS_35L_24S/#technologies)
- [Setup](https://github.com/andxsu/CS_35L_24S/#setup)
- [Authors](https://github.com/andxsu/CS_35L_24S/#authors)

## Features
- **Buyer Features**
    Buyer can place order that specifies the order's contents and dining hall as well as add any specific notes if desired. This will be put onto the Buyer's orders page, where they can see their current active orders.
- **Custom Menus for BYO:**
    Custom menus allow for specifying the buyer's order and for the deliverer to receive custom notes and delivery instructions.
- **Order Status:** 
    Order status pages such as Available Orders (deliverer view) and My Orders (buyer view) allow for buyers to see which orders they have put up and for deliverers to see which orders they have accepted.
- **User Profiles:** 
    The user profile page allows the user to update personal information for a smoother buying and delivering process. Users can update their phone number, email, username, password, and Venmo.

## Technologies
 - Javascript <img src="https://seeklogo.com/images/J/javascript-logo-8892AEFCAC-seeklogo.com.png" alt="javascript" width="30px">
 - Node.js <img src="https://seeklogo.com/images/N/nodejs-logo-FBE122E377-seeklogo.com.png" alt="node.js" width="30px">
 - React.js <img src="https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js_logo-512.png" alt="react.js" width="30px">
 - Express.js <img src="https://www.sohamkamani.com/static/65137ed3c844d05124dcfdab28263c21/38cea/express-routing-logo.png" alt="Express.js" height="30px">
 - MongoDB <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/MongoDB_Logo.png/1598px-MongoDB_Logo.png?20180423174357" alt="MongoDB" height="30px">

## Setup
In order to run a local instance of Bruin Bites, first clone or download a copy of this repository. Follow the instructions below to initialize a local instance of each part of the application.

### Backend Instructions
#### Setup
To setup the dependencies for the backend server, run:
```
cd server
npm install
```

Main backend dependencies:
- Express.js - web server library
- Mongoose - companion library for MongoDB

#### Running
```
cd server
npm start
```
The backend server will be available on http://localhost:8000. 

### Frontend Instructions
#### Setup
To setup the dependencies for the frontend application, run:
```
cd client
npm install
```

Main frontend dependencies:
- React.js
- react-router-dom 

#### Running
To start the frontend application, run:
```
cd client
npm run dev 
```
The frontend will be available on the local host port specified by vite.

## Authors
_BruinBites_ was made as a project for **CS 35L** taught by Professor Paul Eggert at UCLA in Spring 2024. **Made by**: Kaena Kiakona (kaenakiakona@gmail.com), Andrew Su (), Aryan Mosavian Pour (), Henry Shu (henryhshu@gmail.com), Matthew Schinsing (mschinsing14@gmail.com)
## Tutorial References
https://www.mongodb.com/resources/languages/mern-stack-tutorial
