# FSD Video Rental Store Backend
This is my fourth project of GeeksHubs Academy FSD bootcamp.

The objective is to create an API restful backend simulating a Video Rental Store business model.


More than seeking to simulate a real business model, what has been sought is trying to test the largest possible type of requests for thus practice and also have a template guide for future projects.


[Architecture](#architecture)
    
[Installation](#installation)

[How to test the project](#how-to-test-the-project)

[List of Endpoints](#list-of-endpoints)

[Technologies](#technologies)

[Thanks](#thanks)


## Architecture

As mentioned, I wanted to explore the largest number of options in the same project.
Therefore two different API restful programming methods have been used:

    For Users and Orders:
        xxxRouter has the controller function call in each endpoint.
        xxxController has the different controller functions with each promise and its resulting response.
    For Films:
        xxxRouter has the promise and sends the response in res.json.
        xxxController has a FilmsClass instanced as FilmsController.
        FilmsClass has the different methods that execute the logic and results are returned to the endpoint method call.

* DATABASE DESIGN

The database has 3 tables:
    - User: User profiles related One-To-Many with Order table
    - Films: Films profiles related One-To-Many with Order table
    - Order: Information about which films has each User with the price of the Order and the date when the Film was booked (outDate) and the date when the User has to return the film (returnDate).

![ScreenShot](https://raw.githubusercontent.com/jmonloop/GeekshubsFSD_Pr04_VideoStoreBackend/master/assets/relations.jpg)



## Installation
The project is fully deployed in Heroku server so you only need to download Postman application for testing it.

### Postman
1 Download and install [Postman](https://www.postman.com/downloads/)

2 Download the file ../deploy/videoStoreEng.postman_collection.json from this respository

3 Open Postman and click on Import
![ScreenShot](https://raw.githubusercontent.com/jmonloop/GeekshubsFSD_Pr04_VideoStoreBackend/master/assets/postman_import.jpg)

4 Upload videoStore.postman_collection.json file and Import it

5 Expand the new videoStore tab and all the endpoints will be shown

![ScreenShot](https://raw.githubusercontent.com/jmonloop/GeekshubsFSD_Pr04_VideoStoreBackend/master/assets/postman_collection.jpg)


## How to test the project 
In Postman, select the request you want to test from videoStore collection, configure the inputs if needed and click "Send".

You can also do it manually: select CRUD method, copy the endpoint URL, configure inputs if needed and click "Send".

### Params and Query requests
* GET requests that need to send inputs can be either use query or params.

    You can found a good thread explaining the difference <a href='https://stackoverflow.com/questions/14417592/node-js-difference-between-req-query-and-req-params'>here</a>
* In endpoints which "using query" is mentioned you have to introduce the value you want to input into Postman's params tab, in VALUE column.

![ScreenShot](https://raw.githubusercontent.com/jmonloop/GeekshubsFSD_Pr04_VideoStoreBackend/master/assets/postman_query.jpg)

* In endpoints which "using params" is mentioned you just have to introduce the input value at the end of the endpoint.
### Token requests
* As Json Web Token authentication has been used, there are some requests that need a token to be present in header to authenticate that the user has been logged in. If you try to send this request without being login first, the request will not take place and a "Denied access" message will be shown:

![ScreenShot](https://raw.githubusercontent.com/jmonloop/GeekshubsFSD_Pr04_VideoStoreBackend/master/assets/postman_denied_access.jpg)

To execute this type of requests you need to:

    1. Request login with a valid user and password registered in DB
    2. Copy the token responsed by Postman excluding the ""
    3. In the request which needs authetication, go to "Authorization", click in "Type" tab 
    and select "Bearer Token" option.
    4. Paste the token in the field.
    5. Send request
![ScreenShot](https://raw.githubusercontent.com/jmonloop/GeekshubsFSD_Pr04_VideoStoreBackend/master/assets/postman_auth.jpg)

* NOTE: In this type of endopoints "auth is required" will be mentioned.

### Admin role requests
* There is another type of request in which you need to be logged with an "admin" role user profile for being executed.
* For that requests you only need to insert in the body a valid admin user ID in its corresponding body field. 
* The user must be present in the database. You can create admin profiles just changing
    the "rol" value to "admin" when register a new user.
* NOTE: In this type of endopoints "admin is required" will be mentioned.

### The Movie DataBase API Endpoints
* Many of "Films" request aim to TMDB API endpoints.
* Some of them do not interact with the project's database and only print data by Postman.
* Others like "FILMS: clone 500 films..." make a copy of a small TMDB database part 
    into project's local database.
* NOTE: in this type of endpoints will be mentioned that the data comes from TMDB.
    Any other request in which it isn't mentioned TMDB, will be understood that we are talking about operations with local database.

### Seeders
* As sequelize ORM is installed, seeders with dummy data can be added to the project's database.

For adding the seeders:
    1. In terminal, introduce "sequelize db:seed:all" for adding seeders to Film and User tables.
        If you want to add seeders only to one model type:
            sequelize db:seed ../seeders/<<name of the seeder's model file>>



### Hashing
For each sensible data that need to be saved in the database
enviromente variables and "bcrypt" package have been used for this purpose.

## List of Endpoints

### USERS
* GET Get all users https://videostore-backend.herokuapp.com/users
* POST Write raw json text and print it by Postman https://videostore-backend.herokuapp.com/users
* POST Register new user https://videostore-backend.herokuapp.com/users/register
* POST User login https://videostore-backend.herokuapp.com/users/login
* GET Get user profile by email using params https://videostore-backend.herokuapp.com/users/email/:email (auth required)
* GET Get user profile by nickname using params https://videostore-backend.herokuapp.com/users/profile/:nickname (auth required)
* DELETE Delete all users https://videostore-backend.herokuapp.com/users (admin required)
* DELETE Delete user by ID using params https://videostore-backend.herokuapp.com/users/:id (auth required)
* PUT Modify user profile by ID using params https://videostore-backend.herokuapp.com/users/profile/:id (auth required)
* PUT Change user password https://videostore-backend.herokuapp.com/users/newpassword (auth required)
* GET Search user profile by text using params https://videostore-backend.herokuapp.com/users/custom/:term

    Show results in which there are coincidences with any field except "password" ones.

### FILMS
* GET Clone 500 random films from TMDB https://videostore-backend.herokuapp.com/films
* POST Register new film https://videostore-backend.herokuapp.com/films
* DELETE Delete all films https://videostore-backend.herokuapp.com/films
* GET Search in TMDB by title using query https://videostore-backend.herokuapp.com/films/title?arg=title
* GET Get first 5 pages of top rated films from TMDB https://videostore-backend.herokuapp.com/films/toprated
* GET Get total amount of registered films https://videostore-backend.herokuapp.com/films/amount
* GET Search film by term using query https://videostore-backend.herokuapp.com/films/custom?arg=term

    Show results in which there are coincidences with "title" or "synopsis" field
* GET Get TMDB film by ID using params https://videostore-backend.herokuapp.com/films/:id

### ORDERS
* POST Create order https://videostore-backend.herokuapp.com/orders (admin required)
* POST Create order using query https://videostore-backend.herokuapp.com/orders/query?filmId=369&userId=60&price=2&outDate=2021-08-11&returnDate=2022-03-15

    Same that first one but inputting fields by URL query arguments
* GET Report by user name using params https://videostore-backend.herokuapp.com/orders/:name

    Create a report with all orders owned by a user relating other user and film fields.
* GET Full report https://videostore-backend.herokuapp.com/orders

    Create a full report of all orders relating user, orders and film fields and sort them by outDate descendent.
* DELETE Delete Order by ID using params https://videostore-backend.herokuapp.com/orders/2

    

## Technologies
![ScreenShot](https://raw.githubusercontent.com/jmonloop/GeekshubsFSD_Pr04_VideoStoreBackend/master/assets/dependencies.png)


## Thanks

* Thanks to <a href='https://www.mockaroo.com/'>mockaroo</a> website for providing such an excellent service for generating seeders.

* Thanks to GeeksHubs Academy for the training received (https://github.com/GeeksHubsAcademy)

* Thanks to everyone who spends time spreading their knowledge in Stack Overflow.

* Created by Javier Monleón López (https://github.com/jmonloop)


