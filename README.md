# FSD Video Rental Store Backend
This is my fourth project of GeeksHubs Academy FSD bootcamp.
The objective is to create an API restful backend simulating a Video Rental Store business model.


More than seeking to simulate a real business model, what has been sought is to try to test the largest possible type of requests and thus practice and also have a guide template for future projects.


[Architecture](#architecture)
    
[Installation](#installation)

[How to test the project](#how-to-test-the-project)

[List of Endpoints](#list-of-endpoints)

[]

[Thanks](#thanks)


## Architecture
As mentioned, I wanted to explore the largest number of options in the same project.
Therefore two differents methods of programming the API restful have been used:

    For Users and Orders:
        xxxRouter has the controller function call in each endpoint.
        xxxController has the different controller functions with the promise and its result response.
    For Films:
        xxxRouter has the promise and sends the response in res.json
        xxxController has a FilmsClass with the different methods that execute the logic
        and return the result to the endpoint which has the method call.


## Installation
### MySQL Workbench
1 Download and install [MySQL Workbench](https://dev.mysql.com/downloads/workbench/)

2 Assing your username and password

3 Open the LocalInstance

### Postman
1 Download and install [Postman](https://www.postman.com/downloads/)

2 Download the file ../deploy/videoStoreEng.postman_collection.json from this respository

3 Open Postman and click on Import
![ScreenShot](https://raw.githubusercontent.com/jmonloop/GeekshubsFSD_Pr04_VideoStoreBackend/master/assets/postman_import.jpg)

4 Upload videoStore.postman_collection.json file and Import it

5 Expand the new videoStore tab and all the endpoints will be shown

![ScreenShot](https://raw.githubusercontent.com/jmonloop/GeekshubsFSD_Pr04_VideoStoreBackend/master/assets/postman_collection.jpg)

### Visual Studio Code config
1 In ../config/config.json change "username" and "password" from development according to the ones you selected for your MySQL project in the "development" object.

![ScreenShot](https://raw.githubusercontent.com/jmonloop/GeekshubsFSD_Pr04_VideoStoreBackend/master/assets/vsc_config.jpg)

2 In the terminal, introduce "npm i" for installing all necessary dependencies.

3 In the terminal, introduce "sequelize db:create" for creating the DB in MySQL.

4 In the terminal, introduce "sequelize db:migrate" for migrating all models.

3 Then introduce "npm run dev" for running the server and the DB connection.


## How to test the project 
In Postman, select the request you want to test from videoStore collection, configure the inputs if needed and click "Send".

You can also do it manually: select CRUD method, copy the endpoint URL, configure inputs if needed and click "Send".

### Params and Query requests
* GET requests that need to send inputs can be either use query or params.

    You can found good thread explaining the difference <a href='https://stackoverflow.com/questions/14417592/node-js-difference-between-req-query-and-req-params'>here</a>
* In endpoints which "using query" is mentioned you have to introduce the value you want to input into Postman's params tab, in VALUE column.

![ScreenShot](https://raw.githubusercontent.com/jmonloop/GeekshubsFSD_Pr04_VideoStoreBackend/master/assets/postman_query.jpg)

* In endpoints which "using params" is mentioned you have to introduce the input value at the end of the endpoint.
### Token requests
* As Json Web Token authentication has been used, there are some request that need a token to be present in header to authenticate that the user has been login. If you try to send this request without being login first, the request will not take place and a "Denied access" message will be shown:

![ScreenShot](https://raw.githubusercontent.com/jmonloop/GeekshubsFSD_Pr04_VideoStoreBackend/master/assets/postman_denied_access.jpg)

To execute this type of requests you need to:

    1. Request login with a valid user and password registered in DB
    2. Copy the token responsed by Postman
    3. In the request which needs authetication, go to "Authorization", click in "Type" tab 
    and select "Bearer Token" option.
    ![ScreenShot](https://raw.githubusercontent.com/jmonloop/GeekshubsFSD_Pr04_VideoStoreBackend/master/assets/postman_auth.jpg)
    4. Paste the token in the field.
    5. Send request
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
    Any other request in which it isn't mentioned TMDB will be understood that we are talking about operations with local database.

### Seeders
* As sequelize ORM is installed, seeders with dummy data can be added to the project's database.

For adding the seeders:

    1. In terminal, introduce "sequelize db:seed:all" for adding seeders to Film and User tables.
        If want to add seeders just to one model type:
            sequelize db:seed ../seeders/<<name of the seeder's model file>>

* NOTE that users generated by seeder will not have the password field encrypted so you will not be able to make login with them after.


### Hashing
For each sensible data that need to be saved in the database
enviromente variables and "bcrypt" package have been used for this purpose.

## List of Endpoints

### USERS
* GET Get all users http://localhost:3000/users
* POST Write raw json text and print it by Postman http://localhost:3000/users
* POST Register new user http://localhost:3000/users/register
* POST User login http://localhost:3000/users/login
* GET Get user profile by email using params http://localhost:3000/users/email/:email (auth required)
* GET Get user profile by nickname using params http://localhost:3000/users/profile/:nickname (auth required)
* DELETE Delete all users http://localhost:3000/users (admin required)
* DELETE Delete user by ID using params http://localhost:3000/users/:id (auth required)
* PUT Modify user profile by ID using params http://localhost:3000/users/profile/:id (auth required)
* PUT Change user password http://localhost:3000/users/newpassword (auth required)
* GET Search user profile by text using params http://localhost:3000/users/custom/:term

    Show results in which there are coincidences with any field except "password" ones.

### FILMS
* GET Clone 500 random films from TMDB http://localhost:3000/films
* POST Register new film http://localhost:3000/films
* DELETE Delete all films http://localhost:3000/films
* GET Search in TMDB by title using query http://localhost:3000/films/title?arg=title
* GET Get first 5 pages of top rated films from TMDB http://localhost:3000/films/toprated
* GET Get total amount of registered films http://localhost:3000/films/amount
* GET Search film by term using query http://localhost:3000/films/custom?arg=term

    Show results in which there are coincidences with "title" or "synopsis" field
* GET Get TMDB film by ID using params http://localhost:3000/films/:id

### ORDERS
* POST Create order http://localhost:3000/orders (admin required)
* POST Create order using query http://localhost:3000/orders/query?filmId=369&userId=60&price=2&outDate=2021-08-11&returnDate=2022-03-15

    Same that first one but inputting fields by URL query arguments
* GET Report by user name using params http://localhost:3000/orders/:name

    Create a report with all orders owned by a user relating other user and film fields.
* GET Full report http://localhost:3000/orders

    Create a full report of all orders relating user, orders and film fields.
* DELETE Delete Order by ID using params http://localhost:3000/orders/2

    



### Sources Credits
Player 2 textures:
<a href='https://pngtree.com/so/pastel'>pastel png from pngtree.com/</a>

Player 1 brick textures:
<a href='https://pngtree.com/so/brick'>brick png from pngtree.com/</a>

Sky textures:
<a href='https://pngtree.com/so/clouds'>clouds png from pngtree.com/</a>

Custom pointer:
<a href='https://pngtree.com/so/red'>red png from pngtree.com/</a>

Main and final themes:
<a href='https://www.youtube.com/watch?v=LMQ8sSvqphg'>https://www.youtube.com/watch?v=LMQ8sSvqphg</a>

Quake voices:
<a href='https://www.youtube.com/watch?v=ym4VmVwd24c'>https://www.youtube.com/watch?v=ym4VmVwd24c</a>

Healing SFX:
<a href='https://www.youtube.com/watch?v=idVg3eKcbL0'>https://www.youtube.com/watch?v=idVg3eKcbL0</a>

xVision SFX:
<a href='https://www.youtube.com/watch?v=TC0KTDMPx5E'>https://www.youtube.com/watch?v=TC0KTDMPx5E</a>

ak47 SFX:
<a href='https://www.youtube.com/watch?v=1otAua9XIPs'>https://www.youtube.com/watch?v=1otAua9XIPs</a>
<a href='https://www.youtube.com/watch?v=gjbgJNQP6_M'>https://www.youtube.com/watch?v=gjbgJNQP6_M</a>

Mp5 SFX:
<a href='https://www.youtube.com/watch?v=q7uojrDfEvw'>https://www.youtube.com/watch?v=q7uojrDfEvw</a>

Desert Eagle SFX:
<a href='https://www.youtube.com/watch?v=sHffVHCiUto'>https://www.youtube.com/watch?v=sHffVHCiUto</a>

AA12 SFX:
<a href='https://www.youtube.com/watch?v=MYbnuaifdN0'>https://www.youtube.com/watch?v=MYbnuaifdN0</a>



### Thanks
* Thanks to GeeksHubs Academy for the training received (https://github.com/GeeksHubsAcademy)

* Thanks to everyone who spends time spreading their knowledge in Stack Overflow.

* Created by Javier Monleón López (https://github.com/jmonloop)


