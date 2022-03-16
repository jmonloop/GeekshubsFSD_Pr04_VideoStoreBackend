//Imports
const express = require('express');
const app = express();
const cors = require('cors');
const axios = require('axios');
const db = require('./db.js');
const router = require('./router.js');

//Server port number
const PORT = process.env.PORT || 5000;

//Options for CORS configuration
let corsOptions = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    preflightContinue: false,
    allowedHeaders: ["XMLHttpRequest"],
    optionsSuccessStatus: 204
};

//Middlewares
app.use(express.json());
app.use(cors(corsOptions));
app.use(router);


//Run server and database
db.then(()=>{
    app.listen(PORT, ()=> console.log(`Server on port ${PORT}`));
})
.catch((err)=> console.log(err.message)); 