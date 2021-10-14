const dotenv = require("dotenv");
var ip = require('ip');
dotenv.config(); 
const server = require('./src/express')();
const port = process.env.PORT || 4444;
global.logger = require('./src/logger').logger
server.listen(port,()=>{
    console.log(`Server running on port http://${ip.address()}:${port}`);
})