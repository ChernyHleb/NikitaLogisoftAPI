require('dotenv').config();
const http = require('http');
const app = require('./api/app');
const db = require("./models");

const port = process.env.PORT || 3000;
const server = http.createServer(app);

db.sequelize.sync()
.then(() => {
    console.log("DATABASE SYNC SUCCESS");
    server.listen(port, ()=> { 
        console.log('SERVER RUNNING ON PORT ' + port); 
    });
})
.catch((e) => {
    console.error(e.message);
});
