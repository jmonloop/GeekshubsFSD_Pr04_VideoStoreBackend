//Importo la clase express y la guardo en la variable express (siempre igual)
const express = require('express');
const app = express();
const cors = require('cors');
const axios = require('axios');
const db = require('./db.js');
const router = require('./router.js');
const PORT = 3000;
let corsOptions = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204
};
app.use(express.json());
app.use(cors(corsOptions));
app.use(router);
db.then(()=>{
    app.listen(PORT, ()=> console.log(`Server on port ${PORT}`));
})
.catch((err)=> console.log(err.message)); 